import { useState } from 'react'
import { CATEGORY_COLORS } from '../data/workouts'
import styles from './WorkoutCard.module.css'

export default function WorkoutCard({ workout, onToggleComplete, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const color = CATEGORY_COLORS[workout.category] ?? '#888'

  return (
    <div
      className={`${styles.card} ${workout.completed ? styles.done : ''}`}
      style={{ '--cat-color': color }}
    >
      {/* ── Top Row ── */}
      <div className={styles.topRow}>
        <div className={styles.catBadge}>{workout.category}</div>
        <span className={styles.date}>{workout.date}</span>
      </div>

      {/* ── Name + Status ── */}
      <div className={styles.nameRow}>
        <h3 className={styles.name}>{workout.name}</h3>
        {workout.completed
          ? <span className={styles.statusDone}>✓ Done</span>
          : <span className={styles.statusPending}>○ Pending</span>
        }
      </div>

      {/* ── Metrics ── */}
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricVal}>{workout.duration}</span>
          <span className={styles.metricLabel}>min</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.metric}>
          <span className={styles.metricVal}>{workout.calories}</span>
          <span className={styles.metricLabel}>kcal</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.metric}>
          <span className={styles.metricVal}>{workout.exercises.length}</span>
          <span className={styles.metricLabel}>exercises</span>
        </div>
      </div>

      {/* ── Expandable Exercises ── */}
      {expanded && (
        <div className={styles.expanded}>
          <p className={styles.exercisesTitle}>Exercises</p>
          <ul className={styles.exerciseList}>
            {workout.exercises.map((ex, i) => (
              <li key={i} className={styles.exerciseItem}>
                <span className={styles.bullet} />
                {ex}
              </li>
            ))}
          </ul>

          {/* conditional: only show notes if they exist */}
          {workout.notes && (
            <p className={styles.notes}>
              <span className={styles.notesLabel}>Note:</span> {workout.notes}
            </p>
          )}
        </div>
      )}

      {/* ── Actions ── */}
      <div className={styles.actions}>
        <button className={styles.expandBtn} onClick={() => setExpanded(v => !v)}>
          {expanded ? '▲ Collapse' : '▼ Details'}
        </button>

        <div className={styles.actionRight}>
          <button
            className={`${styles.actionBtn} ${workout.completed ? styles.undoBtn : styles.completeBtn}`}
            onClick={() => onToggleComplete(workout.id)}
          >
            {workout.completed ? 'Undo' : 'Complete'}
          </button>
          <button className={styles.deleteBtn} onClick={() => onDelete(workout.id)}>✕</button>
        </div>
      </div>
    </div>
  )
}
