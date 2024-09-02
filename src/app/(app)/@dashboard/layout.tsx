import type { Metadata } from 'next';
import DashboardLayout from '@/ui/layouts/dashboard-layout.tsx/dashboard-layout';

export const metadata: Metadata = {
  title: 'Cuddles',
}


export default async function Layout({
  children,
}: {
  children: React.ReactNode,

}) {

  return <DashboardLayout> {children} </DashboardLayout>

}
