'use client'
import { useState } from 'react'
import styles from './authswitch.module.scss'

export default function AuthSwitch() {
  const [signinActive, setsigninActive] = useState(true)

  function handleClick(signin: boolean) {
    setsigninActive(signin)
  }

  return (
    <div className={styles.container}>
      <span className={`${styles.option} ${signinActive ? styles.active : ''}`} onClick={() => handleClick(true)}>
        Sign in
      </span>
      <span className={`${styles.option}  ${signinActive ? '' : styles.active}`} onClick={() => handleClick(false)}>
        Register
      </span>
    </div>
  )
}
