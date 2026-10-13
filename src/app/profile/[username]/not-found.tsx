import Header from '@/app/components/Header/Header'
import styles from './not-found.module.scss'

export default function notFound() {
  return (
    <>
      <main>
        <Header />

        <p className={styles['error-message']}>We could not find a profile with this username.</p>
      </main>
    </>
  )
}
