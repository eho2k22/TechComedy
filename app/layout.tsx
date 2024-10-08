import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tech Comady Central',
  description: 'Tech Comady Central',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
