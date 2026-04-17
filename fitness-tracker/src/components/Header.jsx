import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header({ workoutCount }) {
  const tabs = [
    { name: 'Dashboard', path: '/', icon: '◉ ' },
    { name: 'Workouts', path: '/workouts', icon: '≡ ' },
    { name: 'Add Workout', path: '/add', icon: '+ ' }
  ]

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>FT</span>
          <div>
            <h1 className={styles.title}>FitTrack</h1>
            <p className={styles.subtitle}>{workoutCount} sessions logged</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {tabs.map(tab => (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) => `${styles.navBtn} ${isActive ? styles.active : ''}`}
            >
              {tab.icon}{tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
