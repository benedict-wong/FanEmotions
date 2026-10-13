import styles from './profilemetrics.module.scss'

import MetricBlock from './MetricBlock/MetricBlock'

interface ProfileMetricsProps {
  className?: string
}

export default function ProfileMetrics({ className }: ProfileMetricsProps) {
  return (
    <div className={`${styles['profile-metrics-container']} ${className ?? ''}`}>
      <MetricBlock type="views" value="124000" />
      <MetricBlock type="likes" value="50000" />
      <MetricBlock type="uploads" value="80" />
    </div>
  )
}
