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
      id: 3,
      title: 'Passionate',
      image: '/assets/image/placeholder.jpg',
    },
    {
      id: 3,
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
