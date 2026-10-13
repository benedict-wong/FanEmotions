import Link from 'next/link'
import styles from './logo.module.scss'

interface LogoProps {
  mode: 'black' | 'white'
  className?: string
}

export default function Logo({ mode, className }: LogoProps) {
  return (
    <Link href="/" className={`${styles.logo} ${styles[mode]} ${className ?? ''}`}>
      FanEmotions
    </Link>
  )
}
