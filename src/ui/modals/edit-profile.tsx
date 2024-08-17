'use client'
import Image from "next/image";
import style from "@/style/pages/edit.module.sass"
import { useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "@/slices/Logos";
import styleForLogo from "@/style/pages/dashboard.module.sass"
import EditProfileForm from "@/ui/forms/edit-profile-form";

export default function EditProfile(){

    const {data: session}= useSession();
    const activeSession = session?.user
    const username = activeSession?.username;
    const userId = activeSession?.id as string;

    const image = activeSession?.profile_pic;

    const profileData = {
        name: activeSession?.name as string,
        username: activeSession?.username as string,
        email: activeSession?.email as string,
    }

    const router = useRouter();
    
    const [modalClose, setModalClose] = useState("");
    const [rotate, setRotate] = useState("");
    

    const handleClose = ()=>{
        setModalClose(style.close);
        setRotate(style.rotate);
        setTimeout(()=>{
            router.back()
        },500)
    }

    return(
    <>
        <div className={`${style.profile} ${modalClose}`}>
            <header className={styleForLogo.header}>
                <Logo />
            </header>
            <button className={rotate} onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.418508 19.5398C-0.155682 18.9426 -0.137063 17.993 0.460094 17.4188L8.33559 10.0001L0.460095 2.58134C-0.137063 2.00715 -0.155682 1.05759 0.418508 0.460432C0.992698 -0.136724 1.94226 -0.155344 2.53942 0.418846L11.5394 8.91884C11.8335 9.20165 11.9998 9.59207 11.9998 10.0001C11.9998 10.4081 11.8335 10.7985 11.5394 11.0813L2.53942 19.5813C1.94226 20.1555 0.992698 20.1369 0.418508 19.5398Z" fill="#ED002F"/>
                </svg>
            </button>
            <div className={style.profilePic}>
                <Image alt={`${username}'s picture`} src={`https://s3.eu-west-3.amazonaws.com/cuddles.storage/${image}`} width={100} height={100}/>
                <span>Change profile picture</span>
            </div>
            <EditProfileForm currentUserData={profileData} userId={userId} />
        </div>
    </>
    )
}