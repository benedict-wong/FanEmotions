import styles from './register.module.scss'
import EmailInput from '../EmailInput/EmailInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import Button from '../Button/Button'

export default function Register() {
  return (
    <>
      <h1 className={styles.title}>Welcome to FanEmotions!</h1>
      <form className={styles.form}>
        <div className={styles['register-name']}>
          <input id="register-firstName" type="text" placeholder="First Name"></input>
          <input id="register-lastName" type="text" placeholder="Last Name"></input>
        </div>
        <EmailInput mode="register" />
        <PasswordInput mode="register" />
        <Button className={styles.button}>Register</Button>
      </form>
    </>
  )
}
