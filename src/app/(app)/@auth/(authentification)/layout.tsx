import type { Metadata } from 'next'
import AuthLayout from '@/ui/layouts/authentication/auth-layout'

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Insert your credentials to start sharing your lovely moments.',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
        <AuthLayout>
          {children}
        </AuthLayout>
    </>
  )
}
