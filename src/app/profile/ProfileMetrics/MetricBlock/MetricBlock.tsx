import styles from './metricblock.module.scss'

interface MetricProps {
  type: string
  value: string
  className?: string
}

export default function MetricBlock({ type, value, className }: MetricProps) {
  return (
    <div className={`${styles['metric-block']} ${className ?? ''}`}>
      <p className={styles['metric-category']}>{`Total ${type}`}</p>
      <h2 className={styles['metric-data']}>{value}</h2>
    </div>
  )
}
