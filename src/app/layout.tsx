import type { Metadata } from 'next';
import './globals.sass';
import { Suspense } from 'react';
import Loading from './loading';


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
        <body>
            { children }
        </body>
    </html>
  )
}
