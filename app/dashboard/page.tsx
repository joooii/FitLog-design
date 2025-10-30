"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Flame, Plus, ChevronLeft, ChevronRight, User } from "lucide-react"
import { WorkoutCalendar } from "@/components/workout-calendar"
import { ExerciseTodoList } from "@/components/exercise-todo-list"

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              FitLog
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left: Calendar Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold">운동 기록</h2>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={goToPreviousMonth} className="h-9 w-9">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium min-w-28 text-center">
                  {currentMonth.toLocaleDateString("ko-KR", { month: "long", year: "numeric" })}
                </span>
                <Button variant="ghost" size="icon" onClick={goToNextMonth} className="h-9 w-9">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <WorkoutCalendar currentMonth={currentMonth} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

            <div className="bg-card border border-border rounded-2xl p-4">
              <h3 className="text-sm font-semibold mb-3">활동 수준</h3>
              <div className="flex items-center gap-3 flex-wrap text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-muted rounded-md"></div>
                  <span className="text-muted-foreground">없음</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-primary/30 rounded-md"></div>
                  <span className="text-muted-foreground">가벼움</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-primary/60 rounded-md"></div>
                  <span className="text-muted-foreground">보통</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-primary rounded-md"></div>
                  <span className="text-muted-foreground">강함</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Exercise Goals Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">
                  {selectedDate.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
                </h2>
                <p className="text-sm text-muted-foreground">오늘의 운동</p>
              </div>
              <Link href="/workout">
                <Button size="sm" className="h-10 shadow-lg shadow-primary/20">
                  <Plus className="w-4 h-4 mr-2" />
                  시작
                </Button>
              </Link>
            </div>
            <ExerciseTodoList selectedDate={selectedDate} />
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-around">
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 gap-1">
            <Flame className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">홈</span>
          </Button>
          <Link href="/workout" className="flex-1 flex justify-center">
            <Button size="sm" className="rounded-full h-12 w-12 shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 gap-1">
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">프로필</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}
