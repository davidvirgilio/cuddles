import type { Metadata } from 'next'
import AuthProvider from './Provider';
import './globals.sass'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options'

export const metadata: Metadata = {
  title: 'Cuddles',
  description: 'Share your heartwarming with us',
}

export default async function RootLayout({
  auth,
  dashboard,
  add,

}: {
  auth: React.ReactNode,
  dashboard: React.ReactNode,
  add: React.ReactNode

  // children: React.ReactNode,

}) {
  // const session = await getServerSession(authOptions);
  const session = await getServerSession(authOptions);
  const isLoggedIn = session ? true : false;


  // // Check if the user is not logged in and trying to access an authenticated route
  // if (!session && authOptions.pages?.signIn) {
  //   // Redirect to the sign-in page (adjust the path as needed)
  //   redirect(authOptions.pages.signIn);
  //   // return null; // Return null to prevent rendering of the rest of the component
  // }


  return (
    <html lang="en">
      <body>
        <AuthProvider>
          { isLoggedIn ? dashboard : auth}
          {add}
        </AuthProvider>

          {/* {children} */}
      </body>

    </html>
  )
}
