/*
* Description: It renders a modal window with 
* Route: /comments/[PostId]
*/

'use client'

import Comments from "@/ui/modals/comments/comments"


export default function Page({params}:{params:{postId: string}}){
    const postIdProp = params.postId;
    return(
        <Comments postId={postIdProp}/>
    )
}