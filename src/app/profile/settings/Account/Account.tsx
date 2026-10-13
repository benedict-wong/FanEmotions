'use client'
import PasswordInput from '@/app/components/PasswordInput/PasswordInput'
import styles from './account.module.scss'
import { createClient } from '@/lib/supabase/client'
import { getUsernameErrorMessage } from '@/lib/register/username'
import { useState, useEffect } from 'react'

interface AccountProps {
  displayName: string
  className?: string
}

export default function Account({ displayName, className }: AccountProps) {
  const supabase = createClient()
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('account-settings-saved')

    if (saved === 'true') {
      setShowSaved(true)
      sessionStorage.removeItem('account-settings-saved')
    }
  }, [])
  async function handleUsernameSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO:
    // change display name: if displayname is the same as the current display name when hitting save, don't change it
    console.log(displayName)
    const data = new FormData(e.currentTarget)

    const newDisplayName = data.get('new_display_name') as string
    const normalizedNewDisplayName = newDisplayName.trim().toLowerCase()

    if (newDisplayName === displayName) {
      setUsernameErrorMessage('The new display name is the same as the current display name.')
      return
    }
    const { data: existingProfile, error: usernameError } = await supabase.from('profiles').select('id').eq('normalized_username', normalizedNewDisplayName).maybeSingle()
    if (usernameError) {
      setUsernameErrorMessage('An error occurred while checking the display name.')
      return
    }

    setUsernameErrorMessage('')

    const errorMessage = getUsernameErrorMessage(!!existingProfile, normalizedNewDisplayName)

    if (errorMessage) {
      setUsernameErrorMessage(errorMessage)
      return
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        username: newDisplayName,
      })
      .eq('normalized_username', displayName.trim().toLowerCase())

    if (updateError) {
      setUsernameErrorMessage('An error occurred while updating the display name.')
      return
    }
    sessionStorage.setItem('account-settings-saved', 'true')
    window.location.reload()

    // change display name: display name must contain 5 letters and maximum 20, can only use upper/lower, numbers, hyphens and underscores. If invalid characters or using profanity/reserved names, return error.
  }

  async function handlePasswordSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // current password is required. If current password input is empty or incorrect, return error.
    // If current password is correct, check if new password and verify new password are equal to each other.
    // If not, return error. If they are equal, check if new password follows the same required pattern as register. If not, return error. If it does, update the password in the database and return success.

    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const currentPassword = data.get('current_password') as string
    const newPassword = data.get('new_password') as string
    const verifyNewPassword = data.get('verify_new_password') as string

    if (!currentPassword) {
      setPasswordErrorMessage('Current password is required.')
      return
    }
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { data: userData, error: currentPasswordError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    })
    if (currentPasswordError) {
      setPasswordErrorMessage('Current password is incorrect.')
      return
    }

    if (newPassword !== verifyNewPassword) {
      setPasswordErrorMessage('New password and verify new password do not match.')
      return
    }

    const { error: passwordChangeError } = await supabase.auth.updateUser({
      password: newPassword,
      current_password: currentPassword,
    })
    if (passwordChangeError) {
      setPasswordErrorMessage('An error occurred while updating the password. Please try again.')
      return
    } else {
      setPasswordErrorMessage('')
      sessionStorage.setItem('account-settings-saved', 'true')
      window.location.reload()
    }
  }

  return (
    <>
      <div className={`${styles.container} ${className ?? ''}`}>
        <h2 className={`${styles['account-saved']} ${showSaved ? styles.visible : ''}`}>New Account Settings Saved</h2>
        <form className={styles['username-form']} onSubmit={handleUsernameSubmit}>
          <p className={styles['form-label']}>Change Display Name</p>
          <input
            id="display_name"
            className={styles['display-name-input']}
            type="text"
            name="new_display_name"
            placeholder="Display Name"
            defaultValue={displayName}
            autoComplete="off"
            pattern="^[a-zA-Z0-9_\-]{5,20}$"
          ></input>
          <p className={styles.error}>{usernameErrorMessage}</p>
          <button type="submit" className={styles['save-button']}>
            Save
          </button>
        </form>
        <form className={styles['password-form']} onSubmit={handlePasswordSubmit}>
          <h2 className={styles.error}>{passwordErrorMessage}</h2>
          <p className={styles['form-label']}>Current Password (Required)</p>
          <PasswordInput name="current_password" mode="signin" />
          <p className={styles['form-label']}>New Password</p>
          <PasswordInput name="new_password" mode="register" />
          <p className={styles['form-label']}>Verify New Password</p>
          <PasswordInput name="verify_new_password" mode="register" />
          <button type="submit" className={styles['save-button']}>
            Save
          </button>
        </form>
      </div>
    </>
  )
}
