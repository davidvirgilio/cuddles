import Post from "@/slices/Post";
import { Icon } from "@/slices/Logos";
// import users from "@/sample-data/users.json"
import Image from "next/image";
import style from "./user.module.sass"
import Link from "next/link";
import SignOut from "@/slices/SignOut";

const getUser = async (user:any) =>{
    try{
        const res = await fetch(`http://localhost:3000/api/mongodb/users/${user}`,{
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
        const res = await fetch(`http://localhost:3000/api/mongodb/posts/${userId}`,{
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
        const userId = user.user_id;
        const {userPosts} = await getPosts(userId);
        const name = user.name;
        const profilePic = user.profile_pic;

        return (
            <>
                <div className={style.userHeader}>
                    <Image alt={`${name}'s avatar`} src={`/images/${profilePic}.jpg`}  width={100} height={100}/>
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
                <Post  posts={userPosts}/>
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