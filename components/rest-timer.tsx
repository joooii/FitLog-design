"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function RestTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [records, setRecords] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const ms = Math.floor((milliseconds % 1000) / 10)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleRecord = () => {
    if (time > 0) {
      setRecords([...records, time])
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setRecords([])
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Timer Display */}
      <div className="bg-secondary/20 rounded-xl p-8 text-center">
        <div className="text-5xl font-bold font-mono text-foreground mb-2">{formatTime(time)}</div>
        <p className="text-sm text-muted-foreground">Rest Time</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button size="lg" onClick={handleStartPause} className="flex-1">
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Start
            </>
          )}
        </Button>
        <Button size="lg" variant="outline" onClick={handleReset}>
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <Button variant="secondary" className="w-full" onClick={handleRecord} disabled={time === 0}>
        Record Time
      </Button>

      {/* Records */}
      {records.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-card-foreground">Recorded Times</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {records.map((record, idx) => (
              <div key={idx} className="flex items-center justify-between bg-muted rounded-lg px-4 py-2">
                <span className="text-sm text-muted-foreground">Rest #{idx + 1}</span>
                <span className="text-sm font-mono font-medium text-foreground">{formatTime(record)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-card-foreground">Quick Presets</h4>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTime(60000)
              setIsRunning(true)
            }}
          >
            1 min
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTime(90000)
              setIsRunning(true)
            }}
          >
            1.5 min
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTime(120000)
              setIsRunning(true)
            }}
          >
            2 min
          </Button>
        </div>
      </div>
    </div>
  )
}
