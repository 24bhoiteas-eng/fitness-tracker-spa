import { CATEGORIES, CATEGORY_COLORS } from '../data/workouts'
import styles from './FilterBar.module.css'

export default function FilterBar({ activeCategory, onCategoryChange, activeStatus, onStatusChange, searchQuery, onSearchChange }) {
  return (
    <div className={styles.bar}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search workouts…"
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
      />

      <div className={styles.filters}>
        <button
          className={`${styles.chip} ${activeCategory === 'All' ? styles.active : ''}`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.chip} ${activeCategory === cat ? styles.active : ''}`}
            style={activeCategory === cat ? { '--chip-color': CATEGORY_COLORS[cat] } : {}}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.statusGroup}>
        {['All', 'Completed', 'Pending'].map(s => (
          <button
            key={s}
            className={`${styles.statusBtn} ${activeStatus === s ? styles.statusActive : ''}`}
            onClick={() => onStatusChange(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
