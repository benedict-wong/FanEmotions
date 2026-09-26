'use client'
import { createClient } from '@/lib/supabase/client'
import { useRef, useState } from 'react'
import styles from './register.module.scss'
import EmailInput from '../EmailInput/EmailInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import Button from '../Button/Button'
import Confirmation from './Confirmation/Confirmation'

export default function Register() {
  const formRef = useRef<HTMLFormElement>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('')

  const hasMinimumLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}:;,.?/]/.test(password)

  const passwordValid = hasMinimumLength && hasUppercase && hasLowercase && hasNumber && hasSpecial

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!passwordValid) {
      return
    }
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) {
      if (error.message.includes('email rate limit exceeded')) {
        // setError('Too many registration attempts. Please wait a few minutes before trying again.')
      }
      console.log(error)
      return
    }
    console.log(data)
    const exists = data.user.aud === 'authenticated'
    const verified = data.user.user_metadata.email_verified
    const containsEmailVerified = 'email_verified' in data.user.user_metadata
    console.log(containsEmailVerified)
    if (exists && containsEmailVerified && !verified) {
      setMode('register')
      localStorage.setItem('confirmation_sent_at', data.user.confirmation_sent_at ?? new Date().toISOString())
      // User account exists in the system, but the account has not yet been email verified. Send the user an email confirmation message
    } else if (exists && !containsEmailVerified) {
      console.log('user already exists and has verified')
      setMode('signin')
    }
    formRef.current.style.display = 'none'
    confirmationRef.current.style.display = 'flex'
  }

  return (
    <>
      <h1 className={styles.title}>Welcome to FanEmotions!</h1>
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['register-name']}>
          <input id="register-firstName" type="text" name="firstName" placeholder="First Name" pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' \-]+$" title="Please enter a valid first name." required></input>
          <input id="register-lastName" type="text" name="lastName" placeholder="Last Name" pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' \-]+$" title="Please enter a valid first name." required></input>
        </div>
        <EmailInput mode="register" />
        <PasswordInput password={password} setPassword={setPassword} mode="register" />
        <div className={styles.requirements}>
          <p className={styles['form-password-requirement-description']}>Your password must</p>
          <ul className={styles['form-password-requirements']}>
            <li className={`${styles['form-password-requirement']} ${hasMinimumLength ? styles.valid : ''}`}>be at least 8 letters long</li>
            <li className={styles['form-password-requirement']}>
              contain an <span className={hasUppercase ? styles.valid : ''}>Uppercase</span>, <span className={hasLowercase ? styles.valid : ''}>lowercase</span>,{' '}
              <span className={hasNumber ? styles.valid : ''}>number</span> & <span className={hasSpecial ? styles.valid : ''}>special character</span>
            </li>
          </ul>
        </div>
        <Button type="submit" className={styles.button}>
          Register
        </Button>
      </form>
      <Confirmation mode={mode} ref={confirmationRef} />
    </>
  )
}
