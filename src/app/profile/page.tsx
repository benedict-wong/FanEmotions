import styles from './profile.module.scss'
import Header from '../components/Header/Header'

import ProfileMetrics from './ProfileMetrics/ProfileMetrics'
import ProfileInformation from './ProfileInformation/ProfileInformation'

export default function ProfilePage() {
  return (
    <>
      <Header mode="compact" />

      <div className={styles.container}>
        <ProfileInformation />
        <ProfileMetrics />
      </div>
    </>
  )
}
