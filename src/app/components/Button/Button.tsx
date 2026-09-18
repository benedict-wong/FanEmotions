import type { ButtonHTMLAttributes } from 'react'
import styles from './button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className ?? ''}`} {...props}>
      {children}
    </button>
  )
}
