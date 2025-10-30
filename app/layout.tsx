import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Inter, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitLog - Track Your Fitness Journey",
  description:
    "An exercise management app that helps you record workouts, stay motivated, and practice a healthy lifestyle",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} font-mono antialiased`}>{children}</body>
    </html>
  )
}
