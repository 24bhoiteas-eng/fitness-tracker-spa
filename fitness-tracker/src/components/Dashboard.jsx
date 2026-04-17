import { useNavigate } from 'react-router-dom'
import StatCard from './StatCard'
import { CATEGORY_COLORS, weeklyGoals } from '../data/workouts'
import styles from './Dashboard.module.css'

export default function Dashboard({ workouts }) {
  const navigate = useNavigate()
  const completed = workouts.filter(w => w.completed)
  const totalMinutes = completed.reduce((s, w) => s + w.duration, 0)
  const totalCalories = completed.reduce((s, w) => s + w.calories, 0)
  const totalExercises = completed.reduce((s, w) => s + w.exercises.length, 0)

  // Category breakdown
  const byCat = {}
  completed.forEach(w => {
    byCat[w.category] = (byCat[w.category] || 0) + 1
  })

  const recentWorkouts = [...workouts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  return (
    <div className={styles.dash}>
      {/* Stats grid */}
      <section>
        <h2 className={styles.sectionTitle}>Weekly Overview</h2>
        <div className={styles.statsGrid}>
          <StatCard
            label="Workouts Completed"
            value={completed.length}
            unit="sessions"
            accent="#c6f135"
            goal={weeklyGoals.workouts}
          />
          <StatCard
            label="Total Time"
            value={totalMinutes}
            unit="min"
            accent="#4da6ff"
            goal={weeklyGoals.minutes}
          />
          <StatCard
            label="Calories Burned"
            value={totalCalories}
            unit="kcal"
            accent="#ff8c42"
            goal={weeklyGoals.calories}
          />
          <StatCard
            label="Exercises Done"
            value={totalExercises}
            unit="sets"
            accent="#a78bfa"
            progress={12}
          />
        </div>
      </section>

      <div className={styles.twoCol}>
        {/* Category Breakdown */}
        <section>
          <h2 className={styles.sectionTitle}>By Category</h2>
          <div className={styles.catCard}>
            {Object.keys(CATEGORY_COLORS).map(cat => {
              const count = byCat[cat] || 0
              const max = Math.max(...Object.values(byCat), 1)
              const pct = Math.round((count / max) * 100)
              return (
                <div key={cat} className={styles.catRow}>
                  <span className={styles.catName}>{cat}</span>
                  <div className={styles.catTrack}>
                    <div
                      className={styles.catFill}
                      style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat] }}
                    />
                  </div>
                  <span className={styles.catCount}>{count}</span>
                </div>
              )
            })}

            {/* Conditional: empty state */}
            {completed.length === 0 && (
              <p className={styles.empty}>No completed workouts yet.</p>
            )}
          </div>
        </section>

        {/* Recent Workouts */}
        <section>
          <div className={styles.rowHeader}>
            <h2 className={styles.sectionTitle}>Recent Sessions</h2>
            <button className={styles.viewAll} onClick={() => navigate('/workouts')}>
              View all →
            </button>
          </div>
          <div className={styles.recentList}>
            {recentWorkouts.length > 0
              ? recentWorkouts.map(w => (
                  <div key={w.id} className={styles.recentItem} style={{ '--rc': CATEGORY_COLORS[w.category] }}>
                    <div>
                      <p className={styles.recentName}>{w.name}</p>
                      <p className={styles.recentMeta}>{w.date} · {w.duration} min · {w.calories} kcal</p>
                    </div>
                    <span
                      className={styles.recentStatus}
                      data-done={w.completed}
                    >
                      {w.completed ? '✓' : '○'}
                    </span>
                  </div>
                ))
              : <p className={styles.empty}>No workouts logged yet.</p>
            }
          </div>
        </section>
      </div>
    </div>
  )
}
