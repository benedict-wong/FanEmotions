import AuthSwitch from '../components/AuthSwitch/AuthSwitch'
import Signin from '../components/Signin/Signin'
import Logo from '../components/Logo/Logo'
import styles from './auth.module.scss'

export default async function AuthPage() {
  return (
    <div className={styles.container}>
      <Logo mode="black" />
      <div className={styles['side-container']}>
        <AuthSwitch />
        <Signin />
      </div>
    </div>
  )
}
