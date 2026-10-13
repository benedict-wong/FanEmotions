'use client'
import styles from './hamburger.module.scss'
import { Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

interface HamburgerProps {
  className?: string
}

export default function Hamburger({ className }: HamburgerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user) {
        setIsLoggedIn(false)
        setAuthLoading(false)
        return
      }

      setFirstName(session.user.user_metadata.first_name)
      setIsLoggedIn(!!session)

      const { data: profile } = await supabase.from('profiles').select('username').eq('id', session.user.id).single()

      if (profile?.username) {
        setUsername(profile.username)
      }
      setAuthLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])
  const router = useRouter()

  function handleClick(direction: string) {
    switch (direction) {
      case 'upload':
        router.push('/upload')
        break
      case 'signin':
        router.push('/auth')
        break
      case 'profile':
        router.push(`/profile/${username}`)
        break

      case 'settings':
        router.push('/profile/settings')
        break
    }
  }

  return (
    <>
      <div className={`${styles.container} ${className ?? ''}`}>
        <Menu className={styles.icon} size={'2.5em'} onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className={`${styles.sideContainer} ${isOpen ? styles.open : ''}`}>
        <span className={styles.item} onClick={() => handleClick('upload')}>
          Upload
        </span>
        <span className={styles.item} onClick={() => handleClick('profile')}>
          Profile
        </span>
        <span className={styles.item} onClick={() => handleClick('settings')}>
          Settings
        </span>
      </div>
    </>
  )
}
