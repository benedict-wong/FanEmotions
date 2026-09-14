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
      image: '/image/placeholder.jpg',
    },
    {
      id: 2,
      title: 'Happy',
      image: '/image/placeholder.jpg',
    },
    {
      id: 3,
      title: 'Angry',
      image: '/image/placeholder.jpg',
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
