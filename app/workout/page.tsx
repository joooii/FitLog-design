"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Flame } from "lucide-react"
import { ExerciseTracker } from "@/components/exercise-tracker"
import { RestTimer } from "@/components/rest-timer"

export default function WorkoutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-6">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로
          </Button>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">운동</h1>
          </div>
          <Button variant="outline" size="sm" className="h-10 bg-transparent">
            완료
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left: Exercise Tracker with checkboxes */}
          <div className="space-y-3 lg:order-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">운동 목표</h2>
              <Button variant="outline" size="sm" className="h-9 bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                추가
              </Button>
            </div>
            <ExerciseTracker />
          </div>

          {/* Right: Rest Timer */}
          <div className="space-y-3 lg:order-2">
            <h2 className="text-lg font-bold">휴식 타이머</h2>
            <RestTimer />
          </div>
        </div>
      </div>
    </div>
  )
}
