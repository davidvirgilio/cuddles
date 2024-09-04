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
export async function getPosts(){
        const response = await fetch(`${URL}/api/mongodb/posts/`,{
            next: {
                tags: ['posts']
            }
        })
        return await response.json();
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
            cache: "no-store" //still I need to identify what to do with this.
        });
        
        return res.json();
}


export async function getUserPosts(userId:any){

    const res = await fetch(`${URL}/api/mongodb/posts/${userId}`,{
        cache: "no-store"
    })
    return res.json();
}