'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import styles from './searchbar.module.scss'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({ placeholder = 'Search...', className }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [search, setSearch] = useState(query)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const scrollPages = ['/', '/search']

    if (!scrollPages.includes(pathname)) {
      setScrolled(false)
      return
    }

    const handleScroll = () => {
      setScrolled(window.scrollY >= 150)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    // When pressing enter and the search state is not empty, do the following below:
    if (event.key === 'Enter' && search.trim()) {
      // Handle search submission here. Launch the search results page with a search query parameter of the search state.
      router.push(`/search?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <input
      className={`${styles.searchbar} ${scrolled ? styles['search-scrolled'] : ''} ${className ?? ''}`}
      id="searchbar"
      type="search"
      placeholder={placeholder}
      value={search}
      onChange={handleSearch}
      onKeyDown={handleEnter}
      autoComplete="off"
    />
  )
}
