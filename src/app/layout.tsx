import type { Metadata } from 'next';
import './globals.sass';
import GoogleAnalytics from '@/ui/google/google-analytics';


export const metadata: Metadata = {
  title: 'Cuddles',
  description: 'Share your heartwarming with us',
}

export default async function RootLayout({
  children,

}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="en">
        <GoogleAnalytics/>
        <body>
            { children }
        </body>
    </html>
  )
}
