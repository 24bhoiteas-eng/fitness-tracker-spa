import WorkoutCard from './WorkoutCard'
import FilterBar from './FilterBar'
import { useState } from 'react'
import styles from './WorkoutList.module.css'

export default function WorkoutList({ workouts, onToggleComplete, onDelete }) {
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = workouts.filter(w => {
    const matchCat    = category === 'All' || w.category === category
    const matchStatus = status === 'All' || (status === 'Completed' ? w.completed : !w.completed)
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchStatus && matchSearch
  })

  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <FilterBar
        activeCategory={category}
        onCategoryChange={setCategory}
        activeStatus={status}
        onStatusChange={setStatus}
        searchQuery={search}
        onSearchChange={setSearch}
      />

      <div className={styles.meta}>
        <span>{sorted.length} workout{sorted.length !== 1 ? 's' : ''} found</span>
      </div>

      {/* List rendering */}
      {sorted.length > 0 ? (
        <div className={styles.list}>
          {sorted.map(w => (
            <WorkoutCard
              key={w.id}
              workout={w}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        /* Conditional: empty state */
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>🏋️</p>
          <p className={styles.emptyTitle}>No workouts found</p>
          <p className={styles.emptyMsg}>Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  )
}
