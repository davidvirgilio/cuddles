import type { Metadata } from 'next'
import { Logo } from '@/slices/Logos'
import style from '@/style/pages/dashboard.module.sass'
import '../globals.sass'
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
  add,
  comments,
  edit

}: {
  children: React.ReactNode,
  add: React.ReactNode,
  comments: React.ReactNode,
  edit: React.ReactNode
}) {

  return (
    <>
      <div className={style.wrapper}>
          <Header/>
          <main className={style.main}>{children}</main>
          <Navbar />
      </div>
      {add}
      {comments}
      {edit}
    </>
  )
}
