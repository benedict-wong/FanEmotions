import styles from './profileinformation.module.scss'
import { MapPin, CalendarDays } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

import ProfilePicture from '../ProfilePicture/ProfilePicture'

const supabase = createClient()

interface ProfileInformationProps {
  first_name: string
  last_name: string
  username: string
  avatar_url: string
  bio: string
  location: string
  created_at: string
}

interface ProfileProps {
  profile: ProfileInformationProps
  className?: string
}

export default function ProfileInformation({ profile, className }: ProfileProps) {
  let avatarUrl = '/assets/image/profile-placeholder.png'
  // useEffect(() => {
  //   supabase.auth.getSession().then(async ({ data: { session } }) => {
  //     if (!session?.user) {
  //       setLoading(false)
  //       return
  //     }
  //     const { first_name, last_name } = session.user.user_metadata
  //     setName(`${first_name} ${last_name}`)
  //     const date = new Date(session.user.created_at)

  //     const formattedDate = date.toLocaleDateString('en-US', {
  //       month: 'long',
  //       year: 'numeric',
  //     })
  //     setJoinDate(formattedDate)

  //     const { data: profile } = await supabase.from('profiles').select('avatar_url, bio, location').eq('username', username).single()

  //     if (profile?.avatar_url) {
  //       const { data } = supabase.storage.from('avatars').getPublicUrl(profile.avatar_url)
  //       setAvatarUrl(data.publicUrl)
  //     }

  //     setBio(profile?.bio ?? 'Bio has no content.')
  //     setLocation(profile?.location ?? 'Unknown')

  //     setLoading(false)
  //   })

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event, session) => {})

  //   return () => {
  //     subscription.unsubscribe()
  //   }
  // }, [supabase])

  if (profile?.avatar_url) {
    const { data } = supabase.storage.from('avatars').getPublicUrl(profile.avatar_url)
    avatarUrl = data.publicUrl
  }
  // console.log(profile.created_at)
  let joinDate = 'unknown'
  if (profile.created_at) {
    joinDate = new Date(profile.created_at).toLocaleDateString('en-us', {
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className={`${styles['profile-information']} ${className ?? ''}`}>
        <ProfilePicture image={avatarUrl} />
        <div className={styles['profile-information-right']}>
          <h1 className={styles.name}>{`${profile.first_name} ${profile.last_name}`}</h1>
          <p className={styles.username}>{'@' + profile.username}</p>
          <p className={styles.bio}>{profile.bio ?? 'Bio has no content'}</p>

          <div className={styles.personal}>
            <span className={styles['personal-item']}>
              <MapPin size={18} />
              {profile.location}
            </span>
            <span className={styles['personal-item']}>
              <CalendarDays size={18} />
              {`Joined ${joinDate}`}
            </span>
          </div>
        </div>
    </div>
  )
}
