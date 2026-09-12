import SearchBar from './components/SearchBar'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Link href="/">
        <h1 id="fanemotions-logo">FanEmotions</h1>
      </Link>
      <SearchBar placeholder="Search for something..." />
    </main>
  )
}
