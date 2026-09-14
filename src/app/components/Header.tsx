import SearchBar from './SearchBar'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div id="header-top-right">
        <button id="signup-button">Sign Up</button>
        <button id="login-button">Log in</button>
      </div>
      <Link href="/">
        <h1 id="fanemotions-logo">FanEmotions</h1>
      </Link>
      <SearchBar placeholder="Search for a FanEmotion" />
    </header>
  )
}
