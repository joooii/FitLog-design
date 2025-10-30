"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Plus } from "lucide-react"

const EXERCISE_DATABASE = [
  "Bench Press",
  "Squats",
  "Deadlift",
  "Pull-ups",
  "Overhead Press",
  "Barbell Row",
  "Dumbbell Curl",
  "Tricep Dips",
  "Leg Press",
  "Lat Pulldown",
  "Shoulder Press",
  "Lunges",
  "Romanian Deadlift",
  "Incline Bench Press",
  "Cable Fly",
  "Leg Curl",
  "Leg Extension",
  "Calf Raise",
  "Face Pull",
  "Hammer Curl",
]

interface ExerciseSearchProps {
  onSelectExercise: (exercise: string) => void
}

export function ExerciseSearch({ onSelectExercise }: ExerciseSearchProps) {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredExercises = EXERCISE_DATABASE.filter((exercise) =>
    exercise.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelect = (exercise: string) => {
    onSelectExercise(exercise)
    setSearch("")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => search && handleSelect(search)}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {isOpen && search && filteredExercises.length > 0 && (
        <Card className="absolute top-full mt-2 w-full max-h-64 overflow-y-auto z-50">
          {filteredExercises.map((exercise) => (
            <button
              key={exercise}
              onClick={() => handleSelect(exercise)}
              className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b last:border-b-0"
            >
              {exercise}
            </button>
          ))}
        </Card>
      )}
    </div>
  )
}
