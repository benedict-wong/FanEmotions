import Card from './Card'

type FanEmotion = {
  id: number
  title: string
  image: string
}

export default function Gallery() {
  const fanEmotions: FanEmotion[] = [
    {
      id: 1,
      title: 'Excited',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 2,
      title: 'Happy',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 3,
      title: 'Angry',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 4,
      title: 'Passionate',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 5,
      title: 'Amazed',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 6,
      title: 'Excited',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 7,
      title: 'Happy',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 8,
      title: 'Angry',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 9,
      title: 'Passionate',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 10,
      title: 'Amazed',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 11,
      title: 'Excited',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 12,
      title: 'Happy',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 13,
      title: 'Angry',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 14,
      title: 'Passionate',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 15,
      title: 'Amazed',
      image: '/assets/image/placeholder.jpg',
    },
  ]
  return (
    <div className="gallery">
      {fanEmotions.map((fanEmotion) => (
        <Card
          key={fanEmotion.id}
          id={`fanEmotion-${fanEmotion.id}`}
          image={fanEmotion.image}
          description={`This is a ${fanEmotion.title} fan emotion.`}
          views={Math.floor(Math.random() * 1000)}
          likes={Math.floor(Math.random() * 100)}
        />
      ))}
    </div>
  )
}
