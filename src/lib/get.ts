/*
* Name: Get functions
* Description: This file contains functions that are used to get data from the database.
*/

"use server"

const URL = process.env.NEXTAUTH_URL; // Deployed domain



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

/** 
 * It fetches an array with all the posts on the database. 
*/
export async function getPosts( offset = 0, limit = 10 ){
        const response = await fetch(`${URL}/api/mongodb/posts?offset=${offset}&limit=${limit}`,{
            next: {
                tags: ['posts'],
                revalidate: 60,
            },
        })
        return response.json();
}


/** 
 * It fetches an array with all the users on the database. 
*/
export async function getUsers(){
      const res = await fetch(`${URL}/api/mongodb/users`,{
      })
      return res.json();
  }


export async function getUser(username:any){
        const res = await fetch(`${URL}/api/mongodb/users/${username}`,{
            next: {
                tags: ['posts'],
            }
        });
        return res.json();
}


export async function getUserPosts(userId:any, offset= 0, limit= 5){

    const res = await fetch(`${URL}/api/mongodb/posts/${userId}?offset=${offset}&limit=${limit}`,{
        cache: "no-store"
    })
    return res.json();
}

export async function getUserById(userId: string){
    const res = await fetch(`${URL}/api/mongodb/users/id/${userId}`,{
    })
    // console.log(await res.json())
    return await res.json();
}