'use client'
import Image from "next/image";
import style from "./edit-profile.module.sass"
import { useSession } from "next-auth/react";
import EditProfileForm from "@/ui/forms/edit-profile-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import saveImageInSession from "@/lib/save-image-in-session";
import deleteS3Image from "@/lib/delete-s3-image";
import { updateAvatarOnDB } from "@/lib/update-user";


export function Alert({sendClose}:{sendClose: (close: boolean)=>void }){
    const router = useRouter();
    const {data: session, update} = useSession();
    const avatar = session?.user.profile_pic;
    const userId = session?.user.id;

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];
        const isSaved = saveImageInSession(file);
        if(isSaved){
            sessionStorage.setItem('type','profile');
            router.push('create/style',{scroll:false});
        }
    }



    const handleRemove = async()=>{
        if(
            avatar === 'avatar1.jpg' ||
            avatar === 'avatar2.jpg' ||
            avatar === 'avatar3.jpg'
        ){
        }else{
            deleteS3Image(avatar);
        }
        const defaultImage = 'sample-5.jpg';
        updateAvatarOnDB( userId, defaultImage);
        await update({profile_pic: defaultImage});
        sendClose(true);
    };
    
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
                <button 
                    className={style.modalButton  + " " + style.modalDelete}
                    onClick={handleRemove}
                >
                    Remove current Photo
                
                </button>
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