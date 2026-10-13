'use client'
import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const compactMode = !['/', '/search'].includes(pathname)

  useEffect(() => {
    const matchMedia = window.matchMedia('(max-width: 768px)')
    const updateViewport = () => setIsMobile(matchMedia.matches)

    updateViewport()
    matchMedia.addEventListener('change', updateViewport)

    return () => {
      matchMedia.removeEventListener('change', updateViewport)
    }
  }, [])

  return isMobile ? <MobileHeader /> : <DesktopHeader mode={compactMode ? 'compact' : 'default'} />
}
