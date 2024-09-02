'use client'
import style from "./wrapper.module.sass"

export default function Modal({
    children,
}:{
   children: React.ReactNode
}) {
    return(
        <div className={style.window}>
            <div className={style.wrapper}>
                {children}
            </div>
        </div>
    )
}