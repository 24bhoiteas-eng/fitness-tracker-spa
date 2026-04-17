import styles from './StatCard.module.css'

export default function StatCard({ label, value, unit, accent, progress, goal }) {
  const pct = goal ? Math.min(100, Math.round((value / goal) * 100)) : null

  return (
    <div className={styles.card} style={{ '--accent': accent }}>
      <p className={styles.label}>{label}</p>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value.toLocaleString()}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>

      {pct !== null && (
        <div className={styles.progressWrap}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.pct}>{pct}% of goal</span>
        </div>
      )}

      {progress !== undefined && pct === null && (
        <p className={styles.change} data-positive={progress >= 0}>
          {progress >= 0 ? '▲' : '▼'} {Math.abs(progress)}% vs last week
        </p>
      )}
    </div>
  )
}
