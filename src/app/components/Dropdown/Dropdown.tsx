import styles from './dropdown.module.scss'
import { useEffect, useRef, useState } from 'react'

interface DropdownItem {
  label: string
  onClick: () => void
  divider?: boolean
}

interface DropdownProps {
  items: DropdownItem[]
  trigger: React.ReactNode
  className?: string
}

export default function Dropdown({ items, trigger, className }: DropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={menuRef} className={`${styles.container} ${className ?? ''}`}>
      <div onClick={() => setIsOpen((open) => !open)}>{trigger}</div>

      {isOpen && (
        <div className={styles.menu}>
          {items.map((item, index) => (
            <div key={index}>
              {item.divider && <hr className={styles.divider} />}
              <div className={styles.item} onClick={item.onClick}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
