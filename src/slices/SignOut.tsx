'use client'
import { signOut } from "next-auth/react"

export default function SignOut(){
    return(
        <>
            <button type="button" className="btn" onClick={()=>signOut()}>Sign Out</button>
        </>

    )
}