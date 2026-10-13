'use client'

import styles from './profilepicture.module.scss'

interface PictureProps {
  image?: string
  className?: string
}

export default function ProfilePicture({ image, className }: PictureProps) {
  return (
    <div className={`${styles['profile-picture']} ${className ?? ''}`}>
      <img className={styles.image} src={image || undefined} alt="profile picture" />
    </div>
  )
}
