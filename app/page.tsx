import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, Calendar, Timer, TrendingUp, Flame } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              FitLog
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="text-sm shadow-lg shadow-primary/20">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full text-sm font-medium text-accent-foreground mb-2">
            <Flame className="w-4 h-4 text-primary" />
            기록하고. 발전하고. 달성하세요.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
            당신의 피트니스 여정을{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              시각화하세요
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed max-w-xl mx-auto">
            모든 운동을 기록하고, 아름다운 캘린더로 진행 상황을 확인하며, FitLog와 함께 동기부여를 유지하세요
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 shadow-lg shadow-primary/20">
                무료로 시작하기
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 h-12 bg-card hover:bg-accent"
              >
                로그인
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">필요한 모든 기능</h2>
            <p className="text-muted-foreground text-base">진지한 결과를 위한 간단한 도구</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">시각적 캘린더</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                색상으로 구분된 활동 추적으로 운동 연속 기록을 한눈에 확인하세요
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">운동 기록</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                빠른 검색과 쉬운 입력으로 세트, 횟수, 무게를 기록하세요
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">휴식 타이머</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                세트 사이의 휴식 시간을 관리하는 내장 타이머
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">진행 상황 인사이트</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">여정을 추적하고 모든 이정표를 축하하세요</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-primary/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-primary-foreground text-balance">
            피트니스를 변화시킬 준비가 되셨나요?
          </h2>
          <p className="text-base text-primary-foreground/90 mb-6 text-balance">
            FitLog와 함께 목표를 달성하는 수천 명의 사용자와 함께하세요
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 h-12 shadow-lg hover:scale-105 transition-transform"
            >
              무료로 시작하기
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FitLog. 피트니스에 대한 열정으로 만들었습니다.</p>
        </div>
      </footer>
    </div>
  )
}
