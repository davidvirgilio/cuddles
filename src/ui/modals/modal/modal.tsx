import style from "./modal.module.sass"
import { useRouter } from "next/navigation"

export default function Modal(
    {
        title,
        children,
    }:{
        title: string,
        children: React.ReactNode
    }){
    
    const router = useRouter();
    const handleClose = () => { router.back();  };

    return (
        <div className={style.overlay}>
            <div className={style.wrapper}>
                <h2>{title}</h2>
                <button onClick={handleClose} className={style.closeButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                        <path d="M27.3384 24.1456C28.2213 25.0262 28.2213 26.4578 27.3384 27.3384C26.8981 27.7787 26.32 28 25.742 28C25.1639 28 24.5859 27.7787 24.1456 27.3384L14.0003 17.1931L3.855 27.3384C3.41469 27.7787 2.83664 28 2.25858 28C1.68053 28 1.10248 27.7787 0.662164 27.3384C-0.220721 26.4578 -0.220721 25.0262 0.662164 24.1456L10.8074 14.0003L0.662164 3.855C-0.220721 2.97438 -0.220721 1.54279 0.662164 0.662164C1.54279 -0.220721 2.97438 -0.220721 3.855 0.662164L14.0003 10.8074L24.1456 0.662164C25.0262 -0.220721 26.4578 -0.220721 27.3384 0.662164C28.2213 1.54279 28.2213 2.97438 27.3384 3.855L17.1931 14.0003L27.3384 24.1456Z" fill="url(#paint0_linear_253_198)"/>
                        <defs>
                            <linearGradient id="paint0_linear_253_198" x1="0.000564505" y1="14.0003" x2="28" y2="14.0003" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF0033"/>
                            <stop offset="1" stopColor="#FF7B00"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </button>
                {children}
            </div>
        </div>
    )
}