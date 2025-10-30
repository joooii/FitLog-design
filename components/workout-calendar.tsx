"use client"

import { cn } from "@/lib/utils"

interface WorkoutCalendarProps {
  currentMonth: Date
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

// Mock data for workout intensity (0 = no workout, 1-3 = intensity levels)
const mockWorkoutData: Record<string, number> = {
  "2025-01-15": 3,
  "2025-01-16": 2,
  "2025-01-17": 1,
  "2025-01-18": 3,
  "2025-01-20": 2,
  "2025-01-22": 3,
  "2025-01-23": 1,
  "2025-01-25": 2,
  "2025-01-27": 3,
  "2025-01-28": 2,
}

export function WorkoutCalendar({ currentMonth, selectedDate, onSelectDate }: WorkoutCalendarProps) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />)
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateString = date.toISOString().split("T")[0]
    const intensity = mockWorkoutData[dateString] || 0
    const isSelected = date.toDateString() === selectedDate.toDateString()
    const isToday = date.toDateString() === today.toDateString()
    const isPast = date < today

    days.push(
      <button
        key={day}
        onClick={() => onSelectDate(date)}
        className={cn(
          "aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all relative",
          "hover:ring-2 hover:ring-primary/50",
          isSelected && "ring-2 ring-primary",
          isToday && "border-2 border-primary",
          intensity === 0 && "bg-muted text-muted-foreground",
          intensity === 1 && "bg-primary/30 text-foreground",
          intensity === 2 && "bg-primary/60 text-primary-foreground",
          intensity === 3 && "bg-primary text-primary-foreground",
        )}
      >
        {day}
        {isToday && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
      </button>,
    )
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  )
}
