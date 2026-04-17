export const CATEGORIES = ['Strength', 'Cardio', 'Flexibility', 'HIIT', 'Recovery']

export const CATEGORY_COLORS = {
  Strength:    '#c6f135',
  Cardio:      '#4da6ff',
  Flexibility: '#ff8c42',
  HIIT:        '#ff4d4d',
  Recovery:    '#a78bfa',
}

export const initialWorkouts = [
  {
    id: 1,
    name: 'Morning Power Lift',
    category: 'Strength',
    duration: 55,
    calories: 420,
    date: '2026-03-07',
    completed: true,
    exercises: ['Deadlift 4×5', 'Bench Press 4×8', 'Pull-ups 3×10', 'OHP 3×8'],
    notes: 'PR on deadlift — felt great.',
  },
  {
    id: 2,
    name: '5K Trail Run',
    category: 'Cardio',
    duration: 28,
    calories: 310,
    date: '2026-03-06',
    completed: true,
    exercises: ['5K run', 'Cool-down walk'],
    notes: 'Heart rate avg 162 bpm.',
  },
  {
    id: 3,
    name: 'Yoga Flow',
    category: 'Flexibility',
    duration: 40,
    calories: 140,
    date: '2026-03-06',
    completed: true,
    exercises: ['Sun Salutation A', 'Warrior Series', 'Pigeon Pose', 'Savasana'],
    notes: 'Great for recovery.',
  },
  {
    id: 4,
    name: 'Tabata Circuit',
    category: 'HIIT',
    duration: 20,
    calories: 280,
    date: '2026-03-05',
    completed: true,
    exercises: ['Burpees', 'Jump Squats', 'Mountain Climbers', 'Push-ups'],
    notes: '',
  },
  {
    id: 5,
    name: 'Upper Body Hypertrophy',
    category: 'Strength',
    duration: 65,
    calories: 390,
    date: '2026-03-04',
    completed: true,
    exercises: ['Incline Press 4×10', 'Cable Rows 4×12', 'Lateral Raises 3×15', 'Curls 3×12'],
    notes: 'Volume day.',
  },
  {
    id: 6,
    name: 'Foam Roll & Stretch',
    category: 'Recovery',
    duration: 25,
    calories: 60,
    date: '2026-03-04',
    completed: false,
    exercises: ['IT Band roll', 'Hip flexor stretch', 'Thoracic rotation'],
    notes: '',
  },
]

export const weeklyGoals = {
  workouts: 5,
  minutes: 200,
  calories: 1500,
}
