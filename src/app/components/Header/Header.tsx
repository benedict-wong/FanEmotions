'use client'

import SearchBar from '../SearchBar/SearchBar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '../Logo/Logo'
import styles from './header.module.scss'

export default function Header() {
  const router = useRouter()

  function handleClick(direction: string) {
    switch (direction) {
      case 'upload':
        router.push('/upload')
        break
      case 'signin':
        router.push('/auth')
        break
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles['top-right']}>
        <button id="upload-button" className={styles['header-button']} onClick={() => handleClick('upload')}>
          Upload
        </button>
        <button id="signin-button" className={styles['header-button']} onClick={() => handleClick('signin')}>
          Sign in
        </button>
      </div>
      <Logo mode="black" />
      <SearchBar placeholder="Search for a FanEmotion" />
    </header>
  )
}
