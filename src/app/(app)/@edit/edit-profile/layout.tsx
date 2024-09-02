'use client'
import style from "@/ui/modals/edit-profile/edit-profile.module.sass";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/ui/components/logos/logo-versions";


export default function Layout({
    children,
}:{
    children: React.ReactNode
}) {

    const [modalClose, setModalClose] = useState("");
    const [rotate, setRotate] = useState("");
    const router = useRouter();
    const currentRoute = usePathname();
    
    useEffect(()=>{
        if(currentRoute === "/edit-profile/picture"){
            setRotate(style.rotate180);
        }else{
            setRotate(style.rotateBack);
            document.body.style.overflow = 'hidden';
        }
    },[currentRoute]);

    const handleClose = ()=>{
        document.body.style.overflow = '';
        if(currentRoute === '/edit-profile'){
            setModalClose(style.close);
            setRotate(style.rotate);
            setTimeout(()=>{
                router.back();
            },500)
        }else{
            router.back();
        }
    }

    return(
        <div className={style.overlay}>
            <div className={`${style.profile} ${modalClose}`}>
                <header>
                    <Logo />
                </header>
                <button className={rotate} onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.418508 19.5398C-0.155682 18.9426 -0.137063 17.993 0.460094 17.4188L8.33559 10.0001L0.460095 2.58134C-0.137063 2.00715 -0.155682 1.05759 0.418508 0.460432C0.992698 -0.136724 1.94226 -0.155344 2.53942 0.418846L11.5394 8.91884C11.8335 9.20165 11.9998 9.59207 11.9998 10.0001C11.9998 10.4081 11.8335 10.7985 11.5394 11.0813L2.53942 19.5813C1.94226 20.1555 0.992698 20.1369 0.418508 19.5398Z" fill="#ED002F"/>
                    </svg>
                </button>
                { children }
            </div>
        </div>
    )
}