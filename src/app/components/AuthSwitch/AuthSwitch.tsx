'use client'
import { useState } from 'react'
import styles from './authswitch.module.scss'

interface AuthSwitchProps {
  signinActive: boolean
  setSigninActive: (value: boolean) => void
}

export default function AuthSwitch({ signinActive, setSigninActive }: AuthSwitchProps) {
  return (
    <div className={styles.container}>
      <span className={`${styles.option} ${signinActive ? styles.active : ''}`} onClick={() => setSigninActive(true)}>
        Sign in
      </span>
      <span className={`${styles.option}  ${signinActive ? '' : styles.active}`} onClick={() => setSigninActive(false)}>
        Register
      </span>
    </div>
  )
}
