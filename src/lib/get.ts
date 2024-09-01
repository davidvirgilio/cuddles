import { NextResponse } from "next/server";

const URL = process.env.NEXTAUTH_URL;

export async function getPostById(postId: string){
    try{
        const response = await fetch(`${URL}/api/mongodb/posts/id/${postId}`,{
            method: 'GET',
            cache: 'no-store',
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