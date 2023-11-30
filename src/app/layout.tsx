import type { Metadata } from 'next'
import './globals.sass'

export const metadata: Metadata = {
  title: 'Cuddles',
  description: 'Share your heartwarming with us',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
