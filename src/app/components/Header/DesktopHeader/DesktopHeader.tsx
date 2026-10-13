'use client'

import SearchBar from '../../SearchBar/SearchBar'
import Button from '../../Button/Button'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Logo from '../../Logo/Logo'
import Dropdown from '../../Dropdown/Dropdown'
import styles from './desktopheader.module.scss'

const supabase = createClient()

interface HeaderProps {
  mode?: 'default' | 'compact'
  className?: string
}

export default function DesktopHeader({ mode = 'default', className }: HeaderProps) {
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [username, setUsername] = useState('')

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

  // For the dropdown menu, there are the items inside
  const dropdownItems = [
    {
      label: 'Profile',
      onClick: () => router.push(`/profile/${username}`),
    },
    {
      label: 'Settings',
      onClick: () => router.push('/profile/settings'),
    },
    {
      label: 'Sign out',
      onClick: () => supabase.auth.signOut(),
      divider: true,
    },
  ]

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
    }
  }

  useEffect(() => {
    const updateHeight = () => {
      const rect = headerRef.current.getBoundingClientRect()
      document.documentElement.style.setProperty('--header-height', `${rect.bottom + 5}px`)
    }

    updateHeight()

    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return (
    <header className={`${styles.header} ${mode === 'compact' ? styles.compact : ''} ${className ?? ''}`}>
      <div style={authLoading ? { visibility: 'hidden' } : {}} ref={headerRef} className={styles['top-right']}>
        <Button className={styles['header-button']} onClick={() => handleClick('upload')}>
          Upload
        </Button>
        {/* The profile container on the right of the screen when on desktop mode */}
        {authLoading ? null : isLoggedIn ? (
          <div className={styles['profile-container']}>
            <p className={styles['profile-name']}>Welcome, {firstName}</p>

            <Dropdown
              className={styles['profile-dropdown']}
              trigger={
                <div className={styles['profile-image']}>
                  <img src="/assets/image/profile_placeholder.png" alt="profile image" />
                </div>
              }
              items={dropdownItems}
            />
          </div>
        ) : (
          <Button className={styles['header-button']} onClick={() => handleClick('signin')}>
            Sign in
          </Button>
        )}
      </div>
      <Logo mode={mode === 'compact' ? 'white' : 'black'} />
      <SearchBar placeholder="Search for a FanEmotion" />
    </header>
  )
}
