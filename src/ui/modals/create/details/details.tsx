'use client'
import { useEffect, useState } from "react"
import style from "./details.module.sass"
import create from "../create.module.sass"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import BackButton from "@/ui/components/back-button";
import S3Image from "@/ui/components/image-from-s3-bucket";

export default function Details(){

    const {data: session} = useSession();
    const router = useRouter();
    const userId = session?.user.id;
    const avatar = session?.user.profile_pic as string;


    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [image, setImage] = useState<File | null >(null);
    const [uploading, setUploading] = useState(false);
    const [isEnable, setEnable] = useState(false)
    const [postData, setPostData] = useState({
        img: fileName as string,
        caption: "" as string,
        user_id: userId as string,
        likes: [],
        comments: [],
    });
    useEffect(()=>{
        const fetchImageData = async()=>{
        const url = sessionStorage.getItem('image-cropped') as string
        async function urlToFile(url: string, mimeType: string): Promise<File> {
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            const filename = `${userId}-${Date.now()}.${mimeType.split('/')[1]}`
            return new File([buffer], filename, { type: mimeType });
        }
        if(url){
            setImageUrl(url)

            const file = await urlToFile(url, "image/jpg");
            setImage(file);
            setFileName(file.name)
        }else{
            console.error("No image URL found in session storage.");
        }
    };
    fetchImageData();
    },[userId]);


    


    const handleSubmit = async (e:any)=>{
        e.preventDefault();

        if(!image){
            console.error("No image found to upload.");
            return;

        }
        setUploading(true);
        const formData = new FormData();
        formData.append("image",image);

        try{
            const response = await fetch('/api/s3-upload',{
                method: "POST",
                body: formData,
            })
            const data = await response.json();

            const res = await fetch(`../api/mongodb/posts/`, {
                method:"POST",
                body: JSON.stringify({...postData, img: image.name }),
                headers:{
                    "Content-type": "application/json"
                }
            })
            if(!res.ok){
                const errorData = await res.json();
                throw new Error('Failed to create post' + errorData);
    
            }

            
        }catch(error){
            console.log("Error during submission:", error);
            setUploading(false);
        }
        
        router.refresh()
        router.back();
        router.back();
        sessionStorage.removeItem('image-to-upload');
        sessionStorage.removeItem('image-cropped');

    }

    const handleChange = (e:any)  =>{
        const value = e.target.value;
        const name = e.target.name;
        setPostData(prev => ({ ...prev, img: fileName as string }));

        setEnable(true)
        setPostData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
        <header className={create.header}>
            <BackButton />
            <h2>Add a caption</h2>
            <button
                className={create.button}
                onClick={handleSubmit}
                type="submit"
                disabled={!isEnable}
            >
                {uploading ? "..." : "share"}
            </button>   
        </header>
        <div className={style.container}>
            {imageUrl ? (<Image
                alt="Your image"
                src={imageUrl}
                className={style.imagePost}
                width={400}
                height={400}
            />) : 'Loading...'}
        </div>
        <div className={style.caption}>
            <S3Image alt="" src={avatar} width={40} height={40} className={style.avatar}/>
            <textarea
                placeholder="Write a caption..."
                onChange={handleChange}
                rows={2}
                name="caption"
                required={true}
                value={postData.caption}
            >
            </textarea>
        </div>

        </>
    )
}