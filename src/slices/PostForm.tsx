'use client'
import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function PostForm({sendClose, imageName}:{sendClose: (close: Boolean)=> void, imageName: string}){
    
    const {data: session} = useSession();
    const email = session?.user?.email;

    const startUser = {
        _id: "",
    }
    const [user, setUser] = useState(startUser);


    const getUser = async(email: string)=>{
        try{
            const resUserInfo = await fetch("api/mongodb/userExists",{
                method:"POST",
                headers:
                {"Content-Type":"application/json"},
                body: JSON.stringify({email}),
            })
            const {user} = await resUserInfo.json();
            setUser(user)
        }catch(error){
            console.log("Error:",error)
        }
    }
    useEffect(() => {
        getUser(email as string);
    }, [email]);

    const startPostData = {
        img: imageName,
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

        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        const userId = user?._id
        formData.user_id = userId;
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
        router.refresh()
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