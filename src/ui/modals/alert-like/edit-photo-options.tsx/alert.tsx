import { useRouter } from "next/navigation";
import saveImageInSession from "@/lib/save-image-in-session";
import deleteS3Image from "@/lib/delete-s3-image";
import { updateAvatarOnDB } from "@/lib/update-user";
import { useSession } from "next-auth/react";
import style from './alert.module.sass'
import { useEffect } from "react";


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


    useEffect(()=>{
        const clickOutside = (e: MouseEvent)=>{
            const modal = document.querySelector('.'+ style.modal);
            if(modal && !modal.contains(e.target as Node)){
                sendClose(true)
                window.removeEventListener('mouseup', clickOutside)
            }
        }
        window.addEventListener('mouseup', clickOutside);
    },[sendClose])
    
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