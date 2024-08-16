'use client'

import React, { useState } from "react";

export default function CommentForm({postId, commenterId, onCommentAdded}:{postId: string, commenterId: any, onCommentAdded: () => void}){
    
    const emptyComment = {
        comment: '',
        commenterId: commenterId,
    }
    const [newComment, setNewComment] = useState(emptyComment);

    const handleChange = (e:any)=>{
        const value = e.target.value;
        const name = e.target.name;
        
        setNewComment((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async(e:any) => {
        e.preventDefault();

        try{
            const response = await fetch(`../api/mongodb/comment/${postId}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({newComment}),
            })

            if(response.ok){
                setNewComment(emptyComment);
                onCommentAdded();
            }else{
                throw new Error('Failed to add the comment.')
            }


        }catch(error){
            console.error(error);
        }
    }

    return(
        <form method="PATCH" onSubmit={handleSubmit}>
            <input 
                type="hidden"
                name="commenterId"
                value={commenterId}
            />
            <input
                onChange={handleChange}
                type="text"
                id="comment"
                name="comment"
                placeholder={"Leave a comment"}
                autoComplete="false"
                required={true}
                value={newComment.comment}
            />
        </form>
    )
}