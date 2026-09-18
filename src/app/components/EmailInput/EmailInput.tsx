'use client'
import styles from './emailinput.module.scss'

interface EmailInputProps {
  mode: 'signin' | 'register'
}

export default function PasswordInput({ mode }: EmailInputProps) {
  return (
    <div className={styles['input-container']}>
      <input className={styles['input-field']} name="email" type="email" placeholder="Email" autoComplete={mode === 'signin' ? 'username' : 'email'} />
    </div>
  )
}
