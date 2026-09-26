import styles from './confirmation.module.scss'
import { CircleCheck } from 'lucide-react'

interface ConfirmationProps {
  ref?: React.Ref<HTMLDivElement>
  mode: 'signin' | 'register'
}

export default function Confirmation({ mode, ref }) {
  return (
    <>
      <div ref={ref} className={styles.confirmation}>
        <CircleCheck className={styles.icon} size={60} />
        <h2 className={styles.header}>{mode === 'signin' ? 'It looks like you already have an account!' : 'Check your mailbox!'}</h2>
        <p className={styles.description}>
          {mode === 'signin' ? 'Please sign in to continue.' : "We've sent you a confirmation link. Please check your inbox or junk folder to activate your FanEmotions account."}
        </p>
      </div>
    </>
  )
}
