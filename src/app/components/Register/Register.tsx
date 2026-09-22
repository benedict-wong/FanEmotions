'use client'
import { createClient } from '@/lib/supabase/client'
import styles from './register.module.scss'
import EmailInput from '../EmailInput/EmailInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import Button from '../Button/Button'

export default function Register() {
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
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
  }

  return (
    <>
      <h1 className={styles.title}>Welcome to FanEmotions!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['register-name']}>
          <input id="register-firstName" type="text" name="firstName" placeholder="First Name"></input>
          <input id="register-lastName" type="text" name="lastName" placeholder="Last Name"></input>
        </div>
        <EmailInput mode="register" />
        <PasswordInput mode="register" />
        <Button type="submit" className={styles.button}>
          Register
        </Button>
      </form>
    </>
  )
}
