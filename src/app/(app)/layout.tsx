import AuthProvider from '@/ui/providers/provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export default async function Layout({
  auth,
  dashboard,
  comments,
  edit,
  create,

}: {
  auth: React.ReactNode,
  dashboard: React.ReactNode,
  comments: React.ReactNode,
  edit: React.ReactNode,
  create: React.ReactNode,
  

}) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = session ? true : false;


  return (
    <AuthProvider>
      { isLoggedIn ? 
      (<>
          {dashboard}
          {comments}
          {edit}
          {create}
          
      </>)
          : auth}
    </AuthProvider>
  )
}
