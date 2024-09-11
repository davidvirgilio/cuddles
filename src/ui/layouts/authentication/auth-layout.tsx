import style from './auth-layout.module.sass'
import Back from './back'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
        <div className={style.frame}>
            <Back />
            <main className={style.authentication}>{children}</main>
        </div>
        <div className={style.paw}></div>
    </>
  )
}
