'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  mode: 'signin' | 'signup'
}

export default function PasswordInput({ mode }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="password-field">
      <input id="password-input" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} />

      <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide Password' : 'Show Password'}>
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
}
