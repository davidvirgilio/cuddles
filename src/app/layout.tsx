import type { Metadata } from 'next'
import AuthProvider from './Provider';
import './globals.sass'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'Cuddles',
  description: 'Share your heartwarming with us',
}

export default async function RootLayout({
  auth,
  dashboard

}: {
  auth: React.ReactNode,
  dashboard: React.ReactNode,
}) {
  const options = authOptions
  const session = await getServerSession(options);
  const isLoggedIn = session ? true : false;


  return (
    <html lang="en">
      <body>
        <AuthProvider>
          { isLoggedIn ? dashboard : auth}
        </AuthProvider>
      </body>

    </html>
  )
}
