// import { NextResponse } from "next/server";

const URL = process.env.NEXTAUTH_URL;

export async function updatePost(postId: string, newData: any){
    try{
        const response = await fetch(`/api/mongodb/posts/id/${postId}`,{
            method: 'PATCH',
            body: JSON.stringify(newData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json()

    }catch(error){
        console.error(error);
        throw error
    }
}