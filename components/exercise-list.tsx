"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  completed: boolean
}

interface ExerciseListProps {
  selectedDate: Date
}

// Mock exercise data
const mockExercises: Exercise[] = [
  { id: "1", name: "Bench Press", sets: 4, reps: 10, completed: true },
  { id: "2", name: "Squats", sets: 4, reps: 12, completed: true },
  { id: "3", name: "Deadlift", sets: 3, reps: 8, completed: false },
  { id: "4", name: "Pull-ups", sets: 3, reps: 10, completed: false },
]

export function ExerciseList({ selectedDate }: ExerciseListProps) {
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const exercises = isToday(selectedDate) ? mockExercises : []

  if (exercises.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">No workout recorded for this day</p>
          <p className="text-sm">
            {isToday(selectedDate)
              ? "Start a workout to begin tracking your exercises"
              : "Select today to start a new workout"}
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {exercises.map((exercise) => (
        <Card key={exercise.id} className="p-4 hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-4">
            {exercise.completed ? (
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">{exercise.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {exercise.sets} sets
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {exercise.reps} reps
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
