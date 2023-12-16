import type { Metadata } from 'next'
import { Logo } from '@/slices/Logos'
import style from './dashboard.module.sass'
import '../globals.sass'
import Link from 'next/link'
import Image from 'next/image'

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

function Navbar(){
    return(
        <nav className={style.navBar}>
            <ul>
                <li><Link href="/"><Image alt="Home" src='/assets/icon-home.svg' width={54.1} height={50}/></Link></li>
                <li><Link href="/add" scroll={false}><Image alt="Add a new post" src='/assets/icon-add.svg' width={80} height={80}/></Link></li>
                <li><Link href="/cuddles"><Image alt="Profile" src='/assets/icon-profile.svg' width={50} height={50}/></Link></li>
            </ul>
        </nav>
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
