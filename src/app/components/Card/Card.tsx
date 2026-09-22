'use client'
import styles from './card.module.scss'
import { Heart, ThumbsUp } from 'lucide-react'

interface CardProps {
  id: string | number
  image: string
  description: string
  views: number
  likes: number
  length: number
}

export default function Card({ image, description, views, likes, length }: CardProps) {
  const minutes = Math.floor(length / 60)
  const seconds = Math.floor(length % 60)

  const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`

  return (
    <article className={styles.card}>
      <img className={styles.preview} src={image} alt={description} />
      <div className={styles['card-information']}>
        <span className={styles['video-length']}>{duration}</span>
        <div className={styles.description}>{description}</div>
        <div className={styles['card-information-footer']}>
          <span className={styles['card-profile']}>Placeholder user</span>

          <div className={styles.metrics}>
            <span className={styles['metrics-entry']}>
              <Heart size={16} /> {views}
            </span>
            <span className={styles['metrics-entry']}>
              <ThumbsUp size={16} />
              {likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
