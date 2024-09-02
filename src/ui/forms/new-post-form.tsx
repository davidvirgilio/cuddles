'use client'
import React, { useState} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function PostForm({sendClose, imageName}:{sendClose: (close: Boolean)=> void, imageName: string}){
    const URL = process.env.NEXTAUTH_URL;
    const router = useRouter();
    
    const {data: session} = useSession();
    const userId = session?.user.id;


    const startPostData = {
        img: imageName,
        caption: "",
        user_id: userId,
        likes: [],
        comments: [],
    }

    const [formData, setFormData] = useState(startPostData);



    const handleChange = (e:any)  =>{
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:any)=>{
        e.preventDefault();

        const res = await fetch(`${URL}/api/mongodb/posts/`, {
            method:"POST",
            body: JSON.stringify({formData}),
            headers:{
                "Content-type": "application/json"
            }
        })
        if(!res.ok){
            const errorData = await res.json();
            throw new Error('Failed to create post' + errorData);

        }
        router.refresh()
        router.back();
        router.back();

    }
    return(
        <form method="post" onSubmit={handleSubmit}>
            <textarea
                placeholder="Write a caption..."
                onChange={handleChange}
                rows={4}
                name="caption"
                required={true}
                value={formData.caption}
            >
            </textarea>
            <button className="btn">Add post</button>
        </form>
    )
}