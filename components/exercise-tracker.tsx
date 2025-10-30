"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, Check } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Exercise {
  id: string
  name: string
  sets: { reps: number; weight: number; completed: boolean }[]
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

export function ExerciseTracker() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Bench Press",
      sets: [
        { reps: 10, weight: 60, completed: false },
        { reps: 8, weight: 70, completed: false },
        { reps: 6, weight: 80, completed: false },
      ],
      completed: false,
    },
    {
      id: "2",
      name: "Squat",
      sets: [
        { reps: 12, weight: 80, completed: false },
        { reps: 10, weight: 90, completed: false },
      ],
      completed: false,
    },
  ])
  const [open, setOpen] = useState(false)

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: [{ reps: 0, weight: 0, completed: false }],
      completed: false,
    }
    setExercises([...exercises, newExercise])
    setOpen(false)
  }

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { reps: 0, weight: 0, completed: false }] } : ex,
      ),
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

  const toggleSetComplete = (exerciseId: string, setIndex: number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set, idx) => (idx === setIndex ? { ...set, completed: !set.completed } : set)),
            }
          : ex,
      ),
    )
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId))
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div key={exercise.id} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">{exercise.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExercise(exercise.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {exercise.sets.map((set, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Checkbox checked={set.completed} onCheckedChange={() => toggleSetComplete(exercise.id, idx)} />
                <span className="text-sm font-medium text-muted-foreground w-12">Set {idx + 1}</span>
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="number"
                    placeholder="Reps"
                    value={set.reps || ""}
                    onChange={(e) => updateSet(exercise.id, idx, "reps", Number.parseInt(e.target.value) || 0)}
                    className="h-9"
                  />
                  <span className="text-sm text-muted-foreground">×</span>
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    value={set.weight || ""}
                    onChange={(e) => updateSet(exercise.id, idx, "weight", Number.parseInt(e.target.value) || 0)}
                    className="h-9"
                  />
                </div>
                {set.completed && (
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={() => addSet(exercise.id)} className="mt-4 w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Set
          </Button>
        </div>
      ))}

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
    </div>
  )
}
