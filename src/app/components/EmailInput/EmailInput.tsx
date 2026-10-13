'use client'
import styles from './emailinput.module.scss'

interface EmailInputProps {
  mode: 'signin' | 'register'
  className?: string
}

export default function EmailInput({ mode, className }: EmailInputProps) {
  return (
    <div className={`${styles['input-container']} ${className ?? ''}`}>
      <input className={styles['input-field']} name="email" type="email" placeholder="Email" autoComplete={mode === 'signin' ? 'username' : 'email'} required />
    </div>
  )
}
