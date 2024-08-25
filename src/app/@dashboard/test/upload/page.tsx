'use client'
import { useEffect, useState } from "react"
import style from "./page.module.sass"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";

export default function Page(){

    const {data: session} = useSession();
    const router = useRouter();
    const userId = session?.user.id;


    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [image, setImage] = useState<File | null >(null);
    const [uploading, setUploading] = useState(false);
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
            // console.log("Image URL fetched from session storage:", url);

            const file = await urlToFile(url, "image/jpg");
            setImage(file);
            setFileName(file.name)
            console.log(file.name)
            console.log("Image File created from URL:", file);
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
            setUploading(false);

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

            console.log("Image object after submission:", image);


            router.refresh()
            router.back();
            router.back();
            sessionStorage.removeItem('image-to-upload');
            sessionStorage.removeItem('image-cropped');

        }catch(error){
            console.log("Error during submission:", error);
            setUploading(false);
        }
       

    }

    const handleChange = (e:any)  =>{
        const value = e.target.value;
        const name = e.target.name;
        setPostData(prev => ({ ...prev, img: fileName as string }));
        console.log(postData)


        setPostData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    };






    return (
        <>
        <div className={style.container}>
            {imageUrl ? (<Image
                alt="Your image"
                src={imageUrl}
                className={style.imagePost}
                width={400}
                height={400}
            />) : 'Loading...'}
        </div>

        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Write a caption..."
                onChange={handleChange}
                rows={2}
                name="caption"
                required={true}
                value={postData.caption}
            >
            </textarea>
            <button className="btn">Add post</button>
        </form>
        </>
    )
}