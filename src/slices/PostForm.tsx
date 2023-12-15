'use client'
import React, { useState} from "react";
import { useRouter } from "next/navigation";


export default function PostForm({sendClose, imageName}:{sendClose: (close: Boolean)=> void, imageName: string}){
    const startPostData = {
        image: imageName,
        caption: "",
        user_id: "",
        likes: [],
        comments: [],
    }

    const [formData, setFormData] = useState(startPostData);
    const router = useRouter();

    const handleChange = (e:any)  =>{
        const value = e.target.value;
        const name = e.target.name;
        console.log(formData)

        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        const res = await fetch("/api/mongodb/posts/", {
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
        router.back();

        console.log("Image Posted")

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