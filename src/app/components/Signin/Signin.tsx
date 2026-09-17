import PasswordInput from '../PasswordInput/PasswordInput'
import styles from './signin.module.scss'

export default function Signin() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome back!</h1>
      <form className={styles.form}>
        <input type="email" id="signin-email-input" placeholder="Email"></input>
        <PasswordInput mode="signin" />
      </form>
    </div>
  )
}
