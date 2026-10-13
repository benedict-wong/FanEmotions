'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from './passwordinput.module.scss'

interface PasswordInputProps {
  mode: 'signin' | 'register'
  password?: string
  name: string
  setPassword?: (password: string) => void
  className?: string
}

export default function PasswordInput({ name, password, setPassword, mode, className }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={`${styles['input-container']} ${className ?? ''}`}>
      <input
        className={styles['input-field']}
        name={name}
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        required
        onChange={(e) => setPassword?.(e.target.value)}
        autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
        minLength={mode === 'register' ? 8 : undefined}
        title={mode === 'register' ? 'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character.' : undefined}
      />

      <button className={styles['visible-button']} type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide Password' : 'Show Password'}>
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
}
