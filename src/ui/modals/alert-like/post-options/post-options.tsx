'use client'
import style from "./post-options.module.sass"
import Link from "next/link";
import deleteS3Image from "@/lib/delete-s3-image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PostOptions({postId, postImage, sendClose}:{postId: string, postImage: string, sendClose: (close: boolean) => void}){
    document.body.style.overflow = 'hidden';
    const router = useRouter()

    const handleDeletePost = async()=>{
            try{
                const response = await fetch('/api/mongodb/posts', {
                    method: 'DELETE',
                    body: JSON.stringify({postId}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const wasImageDeleted = deleteS3Image(postImage);
                
                console.log("Image deleted:",wasImageDeleted)
                console.log(response.statusText);
                closeModal()
                router.refresh()
                
            }catch(error){
                console.error({message: "Error deleting the document ", error})
            }

    };

    const closeModal = ()=>{
        sendClose(true)
        document.body.style.overflow = '';
        
    }

    useEffect(()=>{
        const clickOutside = (e: MouseEvent)=>{
            const modal = document.querySelector('.'+ style.modal);
            if(modal && !modal.contains(e.target as Node)){
                sendClose(true)
                document.body.style.overflow = '';
                window.removeEventListener('mouseup', clickOutside)
            }
        }
        window.addEventListener('mouseup', clickOutside);
    },[sendClose])



    return(
        <div className={style.modalWrapper}>
            <div className={style.modal}>

                <Link 
                    href={`/edit/${postId}`} 
                    className={style.modalButton}
                    onClick={() => sendClose(true)}
                    scroll={false}
                >
                    Edit
                </Link>

                <button 
                    className={`${style.modalButton} ${style.red}`}
                    onClick={handleDeletePost}
                >
                    Delete
                </button>

                <button
                    className={style.modalButton}
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}