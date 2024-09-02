import style from './dashboard-layout.module.sass';
import { Logo } from '@/ui/components/logos/logo-versions'
import Navbar from '@/ui/components/navigation/navigation'

function Header(){
    return (
        <header className={style.header}>
            <Logo />
        </header>
    )
}

export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode,
  
  }) {
  
    return (
      <>
        <div className={style.wrapper}>

            <Header/>
            <main className={style.main}>
                {children}
            </main>
            <Navbar />
        </div>
      </>
    )
  }