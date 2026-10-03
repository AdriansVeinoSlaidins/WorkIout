import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

export type ExerciseSet = {
  id: string
  reps: string
  weight: string
}

export type SelectedExercise = {
  id: string
  name: string
  type: string
  target: string
  sets: ExerciseSet[]
}

type WorkoutContextType = {
  selectedExercises: SelectedExercise[]
  addExercise: (exercise: Omit<SelectedExercise, 'sets'>) => void
  removeExercise: (id: string) => void
  clearExercises: () => void
  addSet: (exerciseId: string) => void
  removeSet: (exerciseId: string, setId: string) => void
  updateSet: (
    exerciseId: string,
    setId: string,
    field: 'reps' | 'weight',
    value: string
  ) => void
}

const WorkoutContext = createContext<WorkoutContextType | null>(null)

const makeSet = (): ExerciseSet => ({
  id: Math.random().toString(36).slice(2),
  reps: '',
  weight: '',
})

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([])

  const addExercise = useCallback((exercise: Omit<SelectedExercise, 'sets'>) => {
    setSelectedExercises((prev) =>
      prev.some((e) => e.id === exercise.id)
        ? prev
        : [...prev, { ...exercise, sets: [makeSet()] }] // starts with one empty set
    )
  }, [])

  const removeExercise = useCallback((id: string) => {
    setSelectedExercises((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const clearExercises = useCallback(() => setSelectedExercises([]), [])

  const addSet = useCallback((exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.map((e) =>
        e.id === exerciseId ? { ...e, sets: [...e.sets, makeSet()] } : e
      )
    )
  }, [])

  const removeSet = useCallback((exerciseId: string, setId: string) => {
    setSelectedExercises((prev) =>
      prev.map((e) =>
        e.id === exerciseId
          ? { ...e, sets: e.sets.filter((s) => s.id !== setId) }
          : e
      )
    )
  }, [])

  const updateSet = useCallback(
    (exerciseId: string, setId: string, field: 'reps' | 'weight', value: string) => {
      setSelectedExercises((prev) =>
        prev.map((e) =>
          e.id === exerciseId
            ? {
                ...e,
                sets: e.sets.map((s) =>
                  s.id === setId ? { ...s, [field]: value } : s
                ),
              }
            : e
        )
      )
    },
    []
  )

  return (
    <WorkoutContext.Provider
      value={{
        selectedExercises,
        addExercise,
        removeExercise,
        clearExercises,
        addSet,
        removeSet,
        updateSet,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkout must be used inside <WorkoutProvider>')
  return ctx
}