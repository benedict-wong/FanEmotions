interface CardProps {
  id: string | number
  image: string
  description: string
  views: number
  likes: number
}

export default function Card({ image, description, views, likes }: CardProps) {
  return (
    <article className="media-card">
      <img src={image} alt={description} />
      <p>{description}</p>
      <div className="media-card-metrics">
        <span className="media-card-likes">views: {views}</span>
        <span className="media-card-comments">likes: {likes}</span>
      </div>
    </article>
  )
}
