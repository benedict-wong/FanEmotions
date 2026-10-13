'use client'
import Header from '@/app/components/Header/Header'
import styles from './settings.module.scss'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import Account from './Account/Account'

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('')
  useEffect(() => {
    const supabase = createClient()
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) {
        console.log(error)
        return
      }
      const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profileError) {
        console.log(profileError)
        return
      }
      setDisplayName(profile.username)
    }
    getUser()
  }, [])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles['sidebar']}>
          <ul className={styles['sidebar-options']}>
            <li>Account Settings</li>
            <li>Email Preferences</li>
            <li>Security</li>
          </ul>
        </div>
        <div className={styles.main}>
          <Account displayName={displayName} />
        </div>
      </div>
    </>
  )
}
