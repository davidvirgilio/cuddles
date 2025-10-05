/*
* Description: It renders a modal window with 
* Route: /comments/[PostId]
*/

'use client';
import { use } from "react";

import Comments from "@/ui/modals/comments/comments"


export default function Page(props:{params: Promise<{postId: string}>}) {
    const params = use(props.params);
    const postId = params.postId;
    return(
        <Comments postId={postId}/>
    )
}