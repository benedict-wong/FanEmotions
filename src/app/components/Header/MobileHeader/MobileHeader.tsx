import Hamburger from '../../Hamburger/Hamburger'
import Logo from '../../Logo/Logo'
import SearchBar from '../../SearchBar/SearchBar'
import styles from './mobileheader.module.scss'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface MobileHeaderProps {
  className?: string
}

export default function MobileHeader({ className }: MobileHeaderProps) {
  const [searchBarVisible, setSearchBarVisible] = useState(false)
  return (
    <>
      <header className={`${styles.header} ${className ?? ''}`}>
        <Hamburger className={styles.hamburger} />
        <Logo className={styles.logo} mode="white" />
        <div className={styles.searchDiv} onClick={() => setSearchBarVisible(!searchBarVisible)}>
          <Search className={styles.search} size={'2.5em'} />
        </div>
      </header>
      <div className={`${styles.searchBarDiv} ${searchBarVisible ? styles.show : ''}`}>
        <SearchBar className={styles.searchBar} />
      </div>
    </>
  )
}
