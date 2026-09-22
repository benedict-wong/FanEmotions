import styles from './profilemetrics.module.scss'

import MetricBlock from './MetricBlock/MetricBlock'

export default function ProfileMetrics() {
  return (
    <>
      <div className={styles['profile-metrics-container']}>
        <MetricBlock type="views" value="124000" />
        <MetricBlock type="likes" value="50000" />
        <MetricBlock type="uploads" value="80" />
      </div>
    </>
  )
}
