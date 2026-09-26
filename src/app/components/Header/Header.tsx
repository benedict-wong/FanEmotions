'use client'

import SearchBar from '../SearchBar/SearchBar'
import Button from '../Button/Button'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Logo from '../Logo/Logo'
import Dropdown from '../Dropdown/Dropdown'
import styles from './header.module.scss'

const supabase = createClient()

interface HeaderProps {
  mode?: 'default' | 'compact'
}

export default function Header({ mode = 'default' }: HeaderProps) {
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [firstName, setFirstName] = useState('')

  // For the dropdown menu, there are the items inside
  const dropdownItems = [
    {
      label: 'Profile',
      onClick: () => router.push('/profile'),
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

  // Handle whether user is logged in or not

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setFirstName(session.user.user_metadata.first_name)
      setIsLoggedIn(!!session)
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

  function handleClick(direction: string) {
    switch (direction) {
      case 'upload':
        router.push('/upload')
        break
      case 'signin':
        router.push('/auth')
        break
      case 'profile':
        router.push('/profile')
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
    <header className={`${styles.header} ${mode === 'compact' ? styles.compact : ''}`}>
      <div ref={headerRef} className={styles['top-right']}>
        <Button className={styles['header-button']} onClick={() => handleClick('upload')}>
          Upload
        </Button>

        {isLoggedIn ? (
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
