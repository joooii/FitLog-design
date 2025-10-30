"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ExerciseTodoListProps {
  selectedDate: Date
}

interface Exercise {
  id: string
  name: string
  sets: { reps: number; weight: number }[]
  completed: boolean
}

const exerciseDatabase = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Overhead Press",
  "Barbell Row",
  "Pull-ups",
  "Dips",
  "Bicep Curls",
  "Tricep Extensions",
  "Leg Press",
  "Lunges",
  "Lat Pulldown",
  "Cable Flyes",
  "Shoulder Press",
  "Romanian Deadlift",
]

export function ExerciseTodoList({ selectedDate }: ExerciseTodoListProps) {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Bench Press",
      sets: [
        { reps: 10, weight: 60 },
        { reps: 8, weight: 70 },
        { reps: 6, weight: 80 },
      ],
      completed: false,
    },
  ])
  const [open, setOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const isPastDate = selectedDate < today
  const isFutureDate = selectedDate > today

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: [{ reps: 0, weight: 0 }],
      completed: false,
    }
    setExercises([...exercises, newExercise])
    setOpen(false)
  }

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) => (ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { reps: 0, weight: 0 }] } : ex)),
    )
  }

  const updateSet = (exerciseId: string, setIndex: number, field: "reps" | "weight", value: number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set, idx) => (idx === setIndex ? { ...set, [field]: value } : set)),
            }
          : ex,
      ),
    )
  }

  const toggleComplete = (exerciseId: string) => {
    setExercises(exercises.map((ex) => (ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex)))
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId))
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div key={exercise.id} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={exercise.completed}
                onCheckedChange={() => toggleComplete(exercise.id)}
                disabled={isPastDate}
                className="mt-1"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground">{exercise.name}</h3>
              </div>
            </div>
            {!isPastDate && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExercise(exercise.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {exercise.sets.map((set, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-12">Set {idx + 1}</span>
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="number"
                    placeholder="Reps"
                    value={set.reps || ""}
                    onChange={(e) => updateSet(exercise.id, idx, "reps", Number.parseInt(e.target.value) || 0)}
                    disabled={isPastDate}
                    className="h-9"
                  />
                  <span className="text-sm text-muted-foreground">×</span>
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    value={set.weight || ""}
                    onChange={(e) => updateSet(exercise.id, idx, "weight", Number.parseInt(e.target.value) || 0)}
                    disabled={isPastDate}
                    className="h-9"
                  />
                </div>
              </div>
            ))}
          </div>

          {!isPastDate && (
            <Button variant="outline" size="sm" onClick={() => addSet(exercise.id)} className="mt-4 w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Set
            </Button>
          )}
        </div>
      ))}

      {!isPastDate && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Add Exercise
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search exercises..." />
              <CommandList>
                <CommandEmpty>No exercise found.</CommandEmpty>
                <CommandGroup>
                  {exerciseDatabase.map((exercise) => (
                    <CommandItem key={exercise} onSelect={() => addExercise(exercise)}>
                      {exercise}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      {!isPastDate && exercises.length > 0 && (
        <Button className="w-full" size="lg">
          Save Workout
        </Button>
      )}

      {isPastDate && exercises.length === 0 && (
        <div className="bg-muted rounded-xl p-8 text-center">
          <p className="text-muted-foreground">No workout recorded for this date</p>
        </div>
      )}
    </div>
  )
}
