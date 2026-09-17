import styles from './card.module.scss'

interface CardProps {
  id: string | number
  image: string
  description: string
  views: number
  likes: number
}

export default function Card({ image, description, views, likes }: CardProps) {
  return (
    <article className={styles.card}>
      <img className={styles.preview} src={image} alt={description} />
      <p>{description}</p>
      <div className={styles.metrics}>
        <span className={styles['metrics-entry']}>views: {views}</span>
        <span className={styles['metrics-entry']}>likes: {likes}</span>
      </div>
    </article>
  )
}
