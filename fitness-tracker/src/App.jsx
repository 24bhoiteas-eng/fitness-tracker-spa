import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import WorkoutList from './components/WorkoutList'
import AddWorkoutForm from './components/AddWorkoutForm'
import { initialWorkouts } from './data/workouts'
import styles from './App.module.css'

export default function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const navigate = useNavigate()

  const handleToggleComplete = id => {
    setWorkouts(ws => ws.map(w => w.id === id ? { ...w, completed: !w.completed } : w))
  }

  const handleDelete = id => {
    setWorkouts(ws => ws.filter(w => w.id !== id))
  }

  const handleAdd = workout => {
    setWorkouts(ws => [workout, ...ws])
    navigate('/workouts')
  }

  return (
    <div className={styles.app}>
      <Header workoutCount={workouts.length} />

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard workouts={workouts} />} />
          <Route path="/workouts" element={<WorkoutList workouts={workouts} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />} />
          <Route path="/add" element={<AddWorkoutForm onAdd={handleAdd} />} />
        </Routes>
      </main>

      <footer className={styles.footer}>
        <span>FitTrack SPA · Built with React Router + CSS Modules</span>
      </footer>
    </div>
  )
}
