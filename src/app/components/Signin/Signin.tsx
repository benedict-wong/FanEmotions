'use client'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EmailInput from '../EmailInput/EmailInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import Button from '../Button/Button'
import styles from './signin.module.scss'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [resendAvailable, setResendAvailable] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const updateTimer = () => {
      const sentAt = localStorage.getItem('confirmation_sent_at')

      if (!sentAt) {
        setTimeLeft(0)
        setResendAvailable(true)
        return
      }

      const elapsed = Math.floor((Date.now() - new Date(sentAt).getTime()) / 1000)

      const remaining = Math.max(60 - elapsed, 0)

      setTimeLeft(remaining)
      setResendAvailable(remaining === 0)
    }

    updateTimer()

    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    const password = formData.get('password') as string
    const supabase = createClient()
    setErrorMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)

      if (error.code === 'email_not_confirmed') {
        // Show "Please confirm your email" message
        setEmail(email)
        setErrorMessage('Please confirm your email via the confirmation email we sent you.')
      }
      const sentAt = localStorage.getItem('confirmation_sent_at')

      if (!sentAt) {
        setResendAvailable(true)
      }

      return
    }
    const user = data.user
    console.log(user)

    if (user) {
      const displayName = `${user.user_metadata?.first_name ?? ''} ${user.user_metadata?.lastName ?? ''}`.trim()

      const joinDate = new Date(user.created_at)
      const joinMonthYear = joinDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })

      const userInfo = {
        displayName,
        joinMonthYear,
      }
      document.cookie = `user_info=${encodeURIComponent(JSON.stringify(userInfo))}; path=/; max-age=2592000; SameSite=Lax`
    }

    // Successful sign in here:
    // Redirect user to profile page.
    router.replace('/profile')
  }
  async function handleResend() {
    if (!email || !resendAvailable) {
      return
    }

    const supabase = createClient()

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    })

    if (error) {
      console.error(error)
      return
    }

    localStorage.setItem('confirmation_sent_at', new Date().toISOString())
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome back!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput mode="signin" />
        <PasswordInput mode="signin" />
        <p className={styles.forgot}>
          Forgot your <a href="#">password</a>?
        </p>
        <Button className={styles.button}>Sign in</Button>
      </form>
      {errorMessage && (
        <div className={styles.confirmation}>
          <p className={styles['error-message']}>{errorMessage}</p>

          {errorMessage.startsWith('Please confirm') && (
            <>
              {resendAvailable ? (
                <p>
                  Haven't received it?{' '}
                  <a className={styles.resend} onClick={handleResend}>
                    Click here to resend the email.
                  </a>
                </p>
              ) : (
                <p>
                  Haven't received it? Please wait {timeLeft} {timeLeft === 1 ? 'second' : 'seconds'} before requesting another email.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
