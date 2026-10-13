import Card from '../Card/Card'
import styles from './gallery.module.scss'
import type { HTMLAttributes } from 'react'

type FanEmotion = {
  id: number
  title: string
  image: string
  length: number
}

export default function Gallery({ className }: HTMLAttributes<HTMLDivElement>) {
  const fanEmotions: FanEmotion[] = [
    {
      id: 1,
      title: 'Excited',
      image: '/assets/image/placeholder.jpg',
      length: 120,
    },
    {
      id: 2,
      title: 'Happy',
      image: '/assets/image/placeholder.jpg',
      length: 145,
    },
    {
      id: 3,
      title: 'Angry',
      image: '/assets/image/placeholder.jpg',
      length: 210,
    },
    {
      id: 4,
      title: 'Passionate',
      image: '/assets/image/placeholder.jpg',
      length: 95,
    },
    {
      id: 5,
      title: 'Amazed',
      image: '/assets/image/placeholder.jpg',
      length: 260,
    },
    {
      id: 6,
      title: 'Excited',
      image: '/assets/image/placeholder.jpg',
      length: 130,
    },
    {
      id: 7,
      title: 'Happy',
      image: '/assets/image/placeholder.jpg',
      length: 180,
    },
    {
      id: 8,
      title: 'Angry',
      image: '/assets/image/placeholder.jpg',
      length: 240,
    },
    {
      id: 9,
      title: 'Passionate',
      image: '/assets/image/placeholder.jpg',
      length: 115,
    },
    {
      id: 10,
      title: 'Amazed',
      image: '/assets/image/placeholder.jpg',
      length: 280,
    },
    {
      id: 11,
      title: 'Excited',
      image: '/assets/image/placeholder.jpg',
      length: 125,
    },
    {
      id: 12,
      title: 'Happy',
      image: '/assets/image/placeholder.jpg',
      length: 160,
    },
    {
      id: 13,
      title: 'Angry',
      image: '/assets/image/placeholder.jpg',
      length: 185,
    },
    {
      id: 14,
      title: 'Passionate',
      image: '/assets/image/placeholder.jpg',
      length: 250,
    },
    {
      id: 15,
      title: 'Amazed',
      image: '/assets/image/placeholder.jpg',
      length: 200,
    },
  ]
  return (
    <div className={`${styles.gallery} ${className ?? ''}`}>
      {fanEmotions.map((fanEmotion) => (
        <Card
          key={fanEmotion.id}
          id={`fanEmotion-${fanEmotion.id}`}
          image={fanEmotion.image}
          description={`This is a ${fanEmotion.title} fan emotion.`}
          views={Math.floor(Math.random() * 1000)}
          likes={Math.floor(Math.random() * 100)}
          length={fanEmotion.length}
        />
      ))}
    </div>
  )
}
