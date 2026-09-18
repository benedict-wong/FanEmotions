'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from './passwordinput.module.scss'

interface PasswordInputProps {
  mode: 'signin' | 'register'
}

export default function PasswordInput({ mode }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={styles['input-container']}>
      <input
        className={styles['input-field']}
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
      />

      <button className={styles['visible-button']} type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide Password' : 'Show Password'}>
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
}
