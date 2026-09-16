'use client'
import { useState } from 'react'

export default function AuthSwitch() {
  const [signinActive, setsigninActive] = useState(true)

  function handleClick(signin: boolean) {
    setsigninActive(signin)
  }

  return (
    <div className="auth-switch-container">
      <span className={`auth-option ${signinActive ? 'active' : ''}`} onClick={() => handleClick(true)}>
        Sign in
      </span>
      <span className={`auth-option ${signinActive ? '' : 'active'}`} onClick={() => handleClick(false)}>
        Register
      </span>
    </div>
  )
}
