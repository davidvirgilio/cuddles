'use client'
import style from '@/app/@dashboard/dashboard.module.sass'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";


export default function Navbar(){

    const {data: session} = useSession();
    const email = session?.user?.email;

    const [username, setUserName] = useState('cuddles');


    const getUser = async(email: string)=>{
        try{
            const resUserInfo = await fetch("api/mongodb/userExists",{
                method:"POST",
                headers:
                {"Content-Type":"application/json"},
                body: JSON.stringify({email}),
            })
            const {user} = await resUserInfo.json();
            const username = user.username;
            setUserName(username)
        }catch(error){
            console.log("I couldn't fix this error, but it's running smoothly. The issue is related to the username call for the navigation bar.",error)
        }
    }
    useEffect(() => {
        getUser(email as string);
    }, [email]);


    return(
        <nav className={style.navBar}>
            <ul>
                <li><Link href="/"><Image alt="Home" src='/assets/icon-home.svg' width={54.1} height={50}/></Link></li>
                <li><Link href="/add" scroll={false}><Image alt="Add a new post" src='/assets/icon-add.svg' width={80} height={80}/></Link></li>
                <li><Link href={username}><Image alt="Profile" src='/assets/icon-profile.svg' width={50} height={50}/></Link></li>
            </ul>
        </nav>
    )
}