import styles from './profile.module.scss'
import Header from '../../components/Header/Header'

import ProfileMetrics from '../ProfileMetrics/ProfileMetrics'
import ProfileInformation from '../ProfileInformation/ProfileInformation'
import ProfileGallery from '../ProfileGallery/ProfileGallery'
import { createClient } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('username', username).single()
  if (error || !profile) {
    notFound()
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles['profile-first-block']}>
          <ProfileInformation profile={profile} />
        </div>

        <ProfileMetrics />
        <hr className={styles['profile-gallery-separator']} />
        <ProfileGallery />
      </div>
    </>
  )
}
