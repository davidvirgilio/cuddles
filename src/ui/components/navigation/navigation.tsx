'use client'
import style from '@/ui/components/navigation/navigation.module.sass'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import saveImageInSession from '@/app/lib/save-image-in-session';



export default function Navbar(){

    const {data: session} = useSession();
    const username = session?.user.username
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];
        const isSaved = saveImageInSession(file);

        if(isSaved){
            router.push('/create/style',{scroll:false})
        }
        
    }

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
                    <label className={style.iconAdd}>
                        <Image
                            className={style.iconAdd}
                            alt="Add a new post"
                            src='/assets/icon-add.svg'
                            width={81}
                            height={80}/>
                        <input
                            type="file"
                            accept="image/*"
                            className={style.hidden}
                            onChange={handleChange}
                        />
                    </label>
                    {/* <Link href="/add" scroll={false}>
                        <Image
                            className={style.iconAdd}
                            alt="Add a new post"
                            src='/assets/icon-add.svg'
                            width={81}
                            height={80}/>
                    </Link> */}
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