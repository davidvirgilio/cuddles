import type { Metadata } from 'next'
import { Logo } from '@/slices/Logos'
import style from '@/style/pages/dashboard.module.sass'
import Navbar from '@/ui/components/navigation/navigation'


export const metadata: Metadata = {
  title: 'Cuddles',
}

function Header(){
    return (
        <header className={style.header}>
            <Logo />
        </header>
    )
}


export default async function Layout({
  children,
}: {
  children: React.ReactNode,

}) {

  return (
    <>
      <div className={style.wrapper}>
          <Header/>
          <main className={style.main}>{children}</main>
          <Navbar />
      </div>

    </>
  )
}
