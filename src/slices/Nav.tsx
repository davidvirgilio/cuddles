'use client'
import style from '@/style/navigation.module.sass'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";


export default function Navbar(){

    const {data: session} = useSession();
    const email = session?.user?.email;
    const [username, setUserName] = useState('');


    const getUser = async(email: string)=>{
        try{
            const resUserInfo = await fetch("api/mongodb/userExists",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({email}),
            });

            if(!resUserInfo.ok){
                throw new Error(`Error: ${resUserInfo.status}`);
            }

            const {user} = await resUserInfo.json();
            setUserName(user.username)
        }catch(error){
            console.log("Error fetching username",error)
        }
    }
    useEffect(() => {
        if(email){
            getUser(email);
        }
    }, [email]);

    return(
        <nav className={style.navBar}>
            <ul>
                <li>
                    <Link href="/">
                        <Image 
                            className={style.iconHome}
                            alt="Home"
                            src='/assets/icon-home.svg'
                            width={55}
                            height={50}/>
                    </Link>
                </li>

                <li>
                    <Link href="/add" scroll={false}>
                        <Image
                            className={style.iconAdd}
                            alt="Add a new post"
                            src='/assets/icon-add.svg'
                            width={81}
                            height={80}/>
                    </Link>
                </li>

                <li>
                    <Link href={`/${username}`}>
                        <Image
                            className={style.iconProfile}
                            alt="Profile"
                            src='/assets/icon-profile.svg'
                            width={50}
                            height={50}/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}