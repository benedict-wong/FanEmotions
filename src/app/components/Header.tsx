'use client'

import SearchBar from './SearchBar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '../components/Logo/Logo'

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
    <header className="header">
      <div id="header-top-right">
        <button id="upload-button" onClick={() => handleClick('upload')}>
          Upload
        </button>
        <button id="signin-button" onClick={() => handleClick('signin')}>
          Sign in
        </button>
      </div>
      <Logo mode="black" />
      <SearchBar placeholder="Search for a FanEmotion" />
    </header>
  )
}
