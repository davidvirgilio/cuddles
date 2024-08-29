'use client'
import Image from "next/image";
import style from "./edit-profile.module.sass"
import { useSession } from "next-auth/react";
import EditProfileForm from "@/ui/forms/edit-profile-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import saveImageInSession from "@/app/lib/save-image-in-session";

export function Alert({sendClose}:{sendClose: (close: boolean)=>void }){
    const router = useRouter();

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];
        const isSaved = saveImageInSession(file);
        if(isSaved){
            sessionStorage.setItem('type','profile');
            router.push('create/style',{scroll:false});
        }
    }
    
    return(
        <div className={style.modalWrapper}>
            <div className={style.modal}>
                <h2>Change Profile Picture</h2>
                <label  className={style.modalButton}>
                    <span> Upload Photo </span>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleUpload}
                        style={{display:'none'}}
                    />
                </label>
                <Link className={style.modalButton  + " " + style.modalDelete} href={'/Remove'}>Remove current Photo</Link>
                <button className={style.modalButton} onClick={()=>{sendClose(true)}}>Cancel</button>
            </div>
        </div>
    )
}

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
                {/* <Link  href={"/edit-profile/picture"}>Edit profile picture</Link> */}
                <button onClick={()=>{setDisplayModal(true)}}>Edit profile picture</button>
            </div>
            <EditProfileForm currentUserData={profileData} userId={userId} />
            {
                displayModal && <Alert sendClose={()=>setDisplayModal(false)}/>
            }
    </>
    )
}