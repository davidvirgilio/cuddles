'use client'
import { signOut } from "next-auth/react"

export default function SignOut(){

    const handleClick = async () =>{
        await signOut({ callbackUrl: '/'})
    }
    return(
        <>
            <button type="button" className="btn" onClick={handleClick}>Sign Out</button>
        </>

    )
}