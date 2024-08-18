'user client'
import React, { useCallback, useEffect, useState } from "react"
import style from "@/ui/modals/comments/comments.module.sass"
import Image from "next/image";
import { useSession } from "next-auth/react";
import CommentForm from "@/ui/forms/new-comment-form";
import Modal from "@/ui/modals/modal/modal"


export default function Comments({postId}:{postId: string}){

    const {data: session} = useSession();
    const user = session?.user;
    const userImage = user?.profile_pic;
    const fullName = user?.name
    const userId = user?.id

    const [commentsArray, setComments] = useState([]);
    const [commentsByUser, setCommentsByUser] = useState<{ [key: string]: any }>({});


    const readComments = useCallback(async() => {
        try{
            const response = await fetch(`../api/mongodb/comment/${postId}`,{
                cache: "no-cache",
            });

            if (response.ok){
                const result = await response.json();
                const comments = result.comments;
                setComments(comments);
            }
        }catch(error){
            console.error("Error:", error);
        }
    },[postId]);

    useEffect(() =>{
        readComments();
    },[readComments]);
    
    useEffect(() =>{
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
        commentsArray.forEach((comment:any) =>{
            getUser(comment.commenterId);
        });
    },[commentsArray, commentsByUser]);

    const comments = commentsArray.map((comment: any, index: number)=>{
        const commenterId = comment.commenterId;
        const commentText = comment.comment;
        const userData = commentsByUser[commenterId];
        
        const username = userData?.username;
        const image = userData?.avatar || "avatar2.jpg";

        return(
            <div key={index} className={style.comment}>
                <Image className={style.userThumbnail} alt="User avatar" src={`https://s3.eu-west-3.amazonaws.com/cuddles.storage/${image}`} width={40} height={40}/>
                <div>
                    <span className={style.username}>{username ? `${username}` : "Loading..."}</span>
                    <span> {commentText}</span>
                </div>
            </div>
        )
    })

    return(
        <Modal title={"Comments"}>
            {
                commentsArray.length > 0 && (
                    <div className={style.comments}>
                        {comments}
                    </div>
                )
            }
            <div className={style.newComment}>
                <Image className={style.userThumbnail} alt={`${fullName}'s avatar`} src={`https://s3.eu-west-3.amazonaws.com/cuddles.storage/${userImage}`} width={40} height={40}/>
                <CommentForm postId={postId} commenterId={userId} onCommentAdded={readComments}/>
            </div>
        </Modal>

    )
}