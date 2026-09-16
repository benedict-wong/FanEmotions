import Link from 'next/link'

interface LogoProps {
  mode: 'black' | 'white'
}

export default function Logo({ mode }: LogoProps) {
  return (
    <Link href="/" id="fanemotions-logo" className={`fanemotions-logo-${mode}`}>
      FanEmotions
    </Link>
  )
}
