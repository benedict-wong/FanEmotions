import Link from 'next/link'
import styles from './logo.module.scss'

interface LogoProps {
  mode: 'black' | 'white'
}

export default function Logo({ mode }: LogoProps) {
  return (
    <Link href="/" className={`${styles.logo} ${styles[mode]}`}>
      FanEmotions
    </Link>
  )
}
