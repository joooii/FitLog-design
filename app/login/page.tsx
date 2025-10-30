import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Flame className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          FitLog
        </span>
      </Link>

      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold">다시 오신 것을 환영합니다</CardTitle>
          <CardDescription className="text-base">피트니스 여정을 계속하려면 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="h-11 bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  비밀번호
                </Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                  비밀번호 찾기
                </Link>
              </div>
              <Input id="password" type="password" required className="h-11 bg-input border-border" />
            </div>
            <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/20">
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            FitLog가 처음이신가요?{" "}
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              계정 만들기
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
