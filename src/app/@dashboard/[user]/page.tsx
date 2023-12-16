import Post from "@/slices/Post";
import { Icon } from "@/slices/Logos";
import Image from "next/image";
import style from "./user.module.sass"
import Link from "next/link";
import SignOut from "@/slices/SignOut";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from "next/navigation";

const URL = "https://cuddles.davidvirgilio.me";


const getUser = async (user:any) =>{
    try{
        const res = await fetch(`${URL}/api/mongodb/users/${user}`,{
            cache: "no-store"
        });
        
        if (!res.ok) {
            throw new Error('Failed to get user information');
        }
        return res.json();
        
    }catch(error){
        console.log("failed to get user", error);
        throw error;
    }
}

const getPosts = async (userId:any) =>{
    try{
        const res = await fetch(`${URL}/api/mongodb/posts/${userId}`,{
            cache: "no-store"
        })
        return res.json();
    }catch(error){
        console.log("failed to get user's posts", error)
        
    }
}
export default async function Page({params}:{params: {user: string}}){    
    
    const userString = params.user;
    const {user} = await getUser(userString);
    
    
    
    if(user){
        const userId = user._id;
        const {posts} = await getPosts(userId);
        const name = user.name;
        const profilePic = user.profile_pic;

        return (
            <>
                <div className={style.userHeader}>
                    <Image alt={`${name}'s avatar`} src={`/images/${profilePic}`}  width={100} height={100}/>
                    <div>
                        <div className={style.heading}>
                            <h1>{name}</h1>
                            <Link href={`/${userString}/edit`}>Edit Profile</Link>
                        </div>
                        <p>Description about the user no more than 50 characters.</p>
                        <div className={style.followButtons}>
                            <button className="btn">Follow</button>
                            {/* <button className="btn">Followers</button> */}
                            <SignOut />
                        </div>
                    </div>
                </div>
                <Post  posts={posts} users={[user]}/>
            </>

        )
    }else{
        return (
            <><Icon />
            <div>
                <div>404</div>
                <div>This user could not be found</div>
            </div>
            </>
        )

    }
}