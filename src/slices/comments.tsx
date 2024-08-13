'user client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import style from "./style/comments.module.sass"
import Image from "next/image";

export default function Comments({postId}:{postId: string}){

    const [commentsArray, setComments] = useState([]);
    const [commentsByUser, setCommentsByUser] = useState<{ [key: string]: any }>({});


    const router = useRouter()
    const handleClose = () => router.back()

    const readComments = async() => {
        try{
            const response = await fetch(`../api/mongodb/comment?_id=${postId}`,{
                cache: "force-cache",
            });

            if (response.ok){
                const result = await response.json();
                const comments = result.comments;
                setComments(comments);
            }
        }catch(error){
            console.error("Error:", error);
        }
    }

    const getUser = async(userId: string)=>{
        try{
            if(!commentsByUser[userId]){
                const responseUsername = await fetch(`../api/mongodb/userExists?_id=${userId}`);
                const {userData} = await responseUsername.json();
                setCommentsByUser((prevItems) => ({
                    ...prevItems,
                    [userId]: userData,
                }));
            }
        
        }catch(error){
            console.log("Error:",error)
        }
    }

    useEffect(() =>{
        readComments();
    },[]);
    
    useEffect(() =>{
        commentsArray.forEach((comment:any) =>{
            getUser(comment.commenter);
        });
    },[commentsArray]);

    


    

    const comments = commentsArray.map((comment: any, index: number)=>{
        const commenterId = comment.commenter;
        const commentText = comment.comment;
        const userData = commentsByUser[commenterId];
        const username = userData?.username;
        const image = userData?.avatar;

        return(
            <div key={index} className={style.comment}>
                <Image className={style.userThumbnail} alt="Post Image" src={`https://s3.eu-west-3.amazonaws.com/cuddles.storage/${image}`} width={40} height={40}/>
                <div>
                    <span className={style.username}>{username ? `${username}` : "Loading..."}</span>
                    <span> {commentText}</span>
                </div>
            </div>
        )
    })

    return(
        <div className={style.overlay}>
        <div className={style.commentsWrapper}>
            <h2>Comments</h2>
            <button onClick={handleClose} className={style.closeButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <path d="M27.3384 24.1456C28.2213 25.0262 28.2213 26.4578 27.3384 27.3384C26.8981 27.7787 26.32 28 25.742 28C25.1639 28 24.5859 27.7787 24.1456 27.3384L14.0003 17.1931L3.855 27.3384C3.41469 27.7787 2.83664 28 2.25858 28C1.68053 28 1.10248 27.7787 0.662164 27.3384C-0.220721 26.4578 -0.220721 25.0262 0.662164 24.1456L10.8074 14.0003L0.662164 3.855C-0.220721 2.97438 -0.220721 1.54279 0.662164 0.662164C1.54279 -0.220721 2.97438 -0.220721 3.855 0.662164L14.0003 10.8074L24.1456 0.662164C25.0262 -0.220721 26.4578 -0.220721 27.3384 0.662164C28.2213 1.54279 28.2213 2.97438 27.3384 3.855L17.1931 14.0003L27.3384 24.1456Z" fill="url(#paint0_linear_253_198)"/>
                    <defs>
                        <linearGradient id="paint0_linear_253_198" x1="0.000564505" y1="14.0003" x2="28" y2="14.0003" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF0033"/>
                        <stop offset="1" stopColor="#FF7B00"/>
                        </linearGradient>
                    </defs>
                </svg>
            </button>
            {
                commentsArray.length > 0 && comments
            }
                <form method="post">
                    <div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Leave a comment"
                            autoComplete="false"
                            required={true}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}