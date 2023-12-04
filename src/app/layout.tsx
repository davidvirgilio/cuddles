import type { Metadata } from 'next'
import './globals.sass'

export const metadata: Metadata = {
  title: 'Cuddles',
  description: 'Share your heartwarming with us',
}

const isLoggedIn = true;

export default function RootLayout({
  auth,
  dashboard

}: {
  auth: React.ReactNode,
  dashboard: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>{ isLoggedIn ? dashboard : auth}</body>
    </html>
  )
}
