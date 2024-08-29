import type { Metadata } from 'next';
import AuthProvider from './provider';
import './globals.sass';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';

export const metadata: Metadata = {
  title: 'Cuddles',
  description: 'Share your heartwarming with us',
}

export default async function RootLayout({
  auth,
  dashboard,
  add,
  comments,
  edit,
  create

}: {
  auth: React.ReactNode,
  dashboard: React.ReactNode,
  add: React.ReactNode,
  comments: React.ReactNode,
  edit: React.ReactNode,
  create: React.ReactNode,
  

}) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = session ? true : false;


  return (
    <html lang="en">
        <body>
          <AuthProvider>
            { isLoggedIn ? dashboard : auth}
            {add}
            {comments}
            {edit}
            {create}
          </AuthProvider>
        </body>
      
    </html>
  )
}
