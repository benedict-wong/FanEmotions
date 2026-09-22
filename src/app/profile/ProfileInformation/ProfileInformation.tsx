import styles from './profileinformation.module.scss'
import { MapPin, CalendarDays } from 'lucide-react'

export default function ProfileInformation() {
  return (
    <>
      <div className={styles.profileinformation}>
        <p className={styles.name}>John Smith</p>
        <p className={styles.username}>@JohnSmith26</p>
        <p className={styles.bio}>Football related videos here</p>

        <div className={styles.personal}>
          <span className={styles.location}>
            <MapPin size={16} />
            Vancouver, Canada
          </span>
          <span className={styles.joinDate}>
            <CalendarDays size={16} />
            Joined November 2025
          </span>
        </div>
      </div>
    </>
  )
}
