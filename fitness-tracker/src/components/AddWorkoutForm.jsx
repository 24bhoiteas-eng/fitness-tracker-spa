import { useState } from 'react'
import { CATEGORIES } from '../data/workouts'
import styles from './AddWorkoutForm.module.css'

const EMPTY = {
  name: '',
  category: 'Strength',
  duration: '',
  calories: '',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
  exercises: '',
}

export default function AddWorkoutForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name = 'Workout name is required'
    if (!form.duration || form.duration < 1) e.duration = 'Enter a valid duration'
    if (!form.calories || form.calories < 1) e.calories = 'Enter valid calories'
    if (!form.exercises.trim())   e.exercises = 'List at least one exercise'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    const newWorkout = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      duration: Number(form.duration),
      calories: Number(form.calories),
      date: form.date,
      completed: false,
      exercises: form.exercises.split('\n').map(s => s.trim()).filter(Boolean),
      notes: form.notes.trim(),
    }

    onAdd(newWorkout)
    setForm(EMPTY)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Log New Workout</h2>
        <p className={styles.formSub}>Fill in the details below to add a session.</p>

        {/* Success Banner — conditional rendering */}
        {success && (
          <div className={styles.successBanner}>
            ✓ Workout added successfully!
          </div>
        )}

        <div className={styles.grid}>
          {/* Name */}
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label}>Workout Name *</label>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="e.g. Morning Power Lift"
              value={form.name}
              onChange={e => set('name', e.target.value)}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          {/* Category */}
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select className={styles.input} value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Date */}
          <div className={styles.field}>
            <label className={styles.label}>Date</label>
            <input className={styles.input} type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>

          {/* Duration */}
          <div className={styles.field}>
            <label className={styles.label}>Duration (min) *</label>
            <input
              className={`${styles.input} ${errors.duration ? styles.inputError : ''}`}
              type="number" min="1" placeholder="45"
              value={form.duration}
              onChange={e => set('duration', e.target.value)}
            />
            {errors.duration && <p className={styles.error}>{errors.duration}</p>}
          </div>

          {/* Calories */}
          <div className={styles.field}>
            <label className={styles.label}>Calories *</label>
            <input
              className={`${styles.input} ${errors.calories ? styles.inputError : ''}`}
              type="number" min="1" placeholder="350"
              value={form.calories}
              onChange={e => set('calories', e.target.value)}
            />
            {errors.calories && <p className={styles.error}>{errors.calories}</p>}
          </div>

          {/* Exercises */}
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label}>Exercises * (one per line)</label>
            <textarea
              className={`${styles.input} ${styles.textarea} ${errors.exercises ? styles.inputError : ''}`}
              placeholder={'Bench Press 4×8\nPull-ups 3×10\nOHP 3×8'}
              value={form.exercises}
              onChange={e => set('exercises', e.target.value)}
              rows={4}
            />
            {errors.exercises && <p className={styles.error}>{errors.exercises}</p>}
          </div>

          {/* Notes */}
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label}>Notes <span className={styles.optional}>(optional)</span></label>
            <input
              className={styles.input}
              placeholder="How did it feel?"
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
            />
          </div>
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          + Add Workout
        </button>
      </div>
    </div>
  )
}
