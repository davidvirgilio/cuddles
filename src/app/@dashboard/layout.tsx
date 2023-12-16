import type { Metadata } from 'next'
import { Logo } from '@/slices/Logos'
import style from './dashboard.module.sass'
import '../globals.sass'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/slices/Nav'


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
