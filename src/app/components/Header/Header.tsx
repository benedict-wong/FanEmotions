'use client'

import SearchBar from '../SearchBar/SearchBar'
import Button from '../Button/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '../Logo/Logo'
import styles from './header.module.scss'

interface HeaderProps {
  mode?: 'default' | 'compact'
}

export default function Header({ mode = 'default' }: HeaderProps) {
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
    <header className={`${styles.header} ${mode === 'compact' ? styles.compact : ''}`}>
      <div className={styles['top-right']}>
        <Button className={styles['header-button']} onClick={() => handleClick('upload')}>
          Upload
        </Button>
        <Button className={styles['header-button']} onClick={() => handleClick('signin')}>
          Sign in
        </Button>
      </div>
      <Logo mode={mode === 'compact' ? 'white' : 'black'} />
      <SearchBar placeholder="Search for a FanEmotion" />
    </header>
  )
}
