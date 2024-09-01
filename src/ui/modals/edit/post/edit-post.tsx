'use client'
import { useEffect, useState } from "react"
import style from "@/ui/modals/create/details/details.module.sass"
import create from "@/ui/modals/create/create.module.sass"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import BackButton from "@/ui/components/back-button";
import S3Image from "@/ui/components/image-from-s3-bucket";
import urlToImage from "@/lib/name-image";
import CloseButton from "@/ui/components/close-button";
import { updatePost } from "@/lib/update";

export default function EditPost({post}:{post: any}){

    const {data: session} = useSession();
    const router = useRouter();
    const userId = session?.user.id;
    const avatar = session?.user.profile_pic as string;
    
    
    // const image = post.img
    const [image, setImage] = useState(post.img);
    const [saving, setSaving] = useState(false);
    const [isEnable, setEnable] = useState(false)
    const [caption, setCaption] = useState(post.caption);


    const handleSubmit = async (e:any)=>{
        setSaving(true);
        updatePost(post._id, {caption: caption});
        handleClose();
        router.back();

    }

    const handleChange = (e:any)  =>{
        const value = e.target.value;
        setCaption(value);
        setEnable(true)
    };

    const handleClose = ()=>{
        document.body.style.overflow = "";
    }

    return (
        <>
        <header className={create.header}>
            <CloseButton onClose={handleClose}/>
            <h2>Edit post</h2>
            <button
                className={create.button}
                onClick={handleSubmit}
                type="submit"
                disabled={!isEnable}
            >
                {saving ? "..." : "save"}
            </button>   
        </header>
        <div className={style.container}>
            <S3Image
                alt="Your image"
                src={image}
                className={style.imagePost}
                width={400}
                height={400}
            /> 
        </div>
        <div className={style.caption}>
            <S3Image alt="" src={avatar} width={40} height={40} className={style.avatar}/>
            <textarea
                onChange={handleChange}
                name="caption"
                rows={5}
                required={true}
                value={caption}
            >
            </textarea>
        </div>

        </>
    )
}