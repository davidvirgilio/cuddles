'use client'
import style from './choose-avatar.module.sass'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import saveImageInSession from '@/app/lib/save-image-in-session'
import S3Image from '@/ui/components/image-from-s3-bucket'


export default function ChooseAvatar(){

    const [avatar, setAvatar] = useState('');
    const { data: session, update } = useSession();
    const avatarFromSession = session?.user.profile_pic as string;
    const userId = session?.user.id as string;
    const router = useRouter();

    document.body.style.overflow = 'hidden';

    const handleClick = (event:any)=>{
        document.querySelector(`.${style.clicked}`)?.classList.remove(style.clicked);
        event.target.classList.add(style.clicked);
    };


    const handleRadioChange = (e:any)=>{
        setAvatar(e.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];
        const isSaved = saveImageInSession(file);
        if(isSaved){
            sessionStorage.setItem('type','profile');
            router.replace('/create/style',{scroll:false});
        }
    }

    const handleClose = ()=>{
        document.body.style.overflow = '';
        router.push("/")
        router.refresh()
    }

    const handleSave = async()=>{
        const newAvatar = { profile_pic:  avatar };
        try{
            await fetch(`../api/mongodb/users/${userId}`, {
                method:"PATCH",
                body: JSON.stringify(newAvatar),
                headers:{
                    "Content-type": "application/json"
                }
            })
        }catch(error){
            console.log("Error updating database:", error);
        }

        await update({profile_pic: avatar});
        handleClose()
        
    };

    return(
            <div className={style.avatar}>
                <h1>Choose an Avatar</h1>
                <form onChange={handleRadioChange} className={style.form}>
                    <label>
                        <Image 
                            alt='Green Budgie' 
                            src={'/images/avatar1.jpg'} 
                            width={640} 
                            height={960}
                            onClick={handleClick}
                        />
                        <input 
                            type='radio' 
                            name='avatar' 
                            value={'avatar1.jpg'} 
                            style={{display:'none'}}
                        />
                    </label>
                    <label>
                        <Image 
                            alt='Black dog' 
                            src={'/images/avatar2.jpg'} 
                            width={640} 
                            height={886}
                            onClick={handleClick}
                        />
                        <input 
                            type='radio' 
                            name='avatar' 
                            value={'avatar2.jpg'} 
                            style={{display:'none'}}
                        />
                    </label>
                    <label>
                        <Image 
                            alt='White kitten' 
                            src={'/images/avatar3.jpg'} 
                            width={640} 
                            height={669}
                            onClick={handleClick}
                        />
                        <input 
                            type='radio' 
                            name='avatar' 
                            value={'avatar3.jpg'} 
                            style={{display:'none'}}
                        />
                    </label>
                </form>

                <label className={style.addYours}>
                    <S3Image
                        alt='Add your own image' 
                        src={avatar ? avatar : avatarFromSession} 
                        width={100} 
                        height={100}
                    />
                    <span> Add your own </span>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        style={{display:'none'}}
                    />
                </label>

                <div>
                    <button className={style.btn} onClick={handleClose}>Skip</button> 
                    <button type='submit' className={style.btn} onClick={handleSave}>Save</button>
                </div>
                <div className={style.paw}></div>
            </div>
    )
}