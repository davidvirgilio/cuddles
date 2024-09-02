'use client'
import Image from "next/image";
import style from "./edit-profile.module.sass"
import { useSession } from "next-auth/react";
import EditProfileForm from "@/ui/forms/edit-profile-form";
import { useState } from "react";
import { Alert } from "../alert-like/edit-photo-options.tsx/alert";


export default function EditProfile(){

    const {data: session}= useSession();
    const activeSession = session?.user
    const username = activeSession?.username;
    const userId = activeSession?.id as string;
    const [displayModal, setDisplayModal] = useState(false);


    const image = activeSession?.profile_pic;

    const profileData = {
        name: activeSession?.name as string,
        username: activeSession?.username as string,
        email: activeSession?.email as string,
    }


    return(
    <>
            <div className={style.profilePic}>
                <Image alt={`${username}'s picture`} src={`https://s3.eu-west-3.amazonaws.com/cuddles.storage/${image}`} width={100} height={100}/>
                <button className={style.editButton} onClick={()=>{setDisplayModal(true)}}>Edit profile picture</button>
            </div>
            <EditProfileForm currentUserData={profileData} userId={userId} />
            {
                displayModal && <Alert sendClose={()=>setDisplayModal(false)}/>
            }
    </>
    )
}