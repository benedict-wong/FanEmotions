'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
}

export default function SearchBar({ placeholder = 'Search...' }: SearchBarProps) {
  const [search, setSearch] = useState('')
  const router = useRouter()

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    // When pressing enter and the search state is not empty, do the following below:
    if (event.key === 'Enter' && search.trim()) {
      // Handle search submission here. Launch the search results page with a search query parameter of the search state.
      router.push(`/search?query=${encodeURIComponent(search.trim())}`)
    }
  }

  return <input type="search" placeholder={placeholder} value={search} onChange={handleSearch} onKeyDown={handleEnter} />
}
