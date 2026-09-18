'use client'

import AuthSwitch from '../components/AuthSwitch/AuthSwitch'
import Signin from '../components/Signin/Signin'
import Register from '../components/Register/Register'
import Logo from '../components/Logo/Logo'
import styles from './auth.module.scss'
import { useState } from 'react'

export default function AuthPage() {
  const [signinActive, setSigninActive] = useState(true)
  return (
    <div className={styles.container}>
      <div className={styles['side-container']}>
        <Logo mode="black" />
        <AuthSwitch signinActive={signinActive} setSigninActive={setSigninActive} />
        {signinActive ? <Signin /> : <Register />}
      </div>
    </div>
  )
}
