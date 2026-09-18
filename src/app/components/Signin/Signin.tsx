import EmailInput from '../EmailInput/EmailInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import Button from '../Button/Button'
import styles from './signin.module.scss'

export default function Signin() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome back!</h1>
      <form className={styles.form}>
        <EmailInput mode="signin" />
        <PasswordInput mode="signin" />
        <Button className={styles.button}>Sign in</Button>
      </form>
      <p className={styles.forgot}>
        Forgot your <a href="#">username</a> or <a href="#">password</a>?
      </p>
    </div>
  )
}
