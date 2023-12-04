import Post from "@/slices/Post";
import { Icon } from "@/slices/Logos";
import users from "@/sample-data/users.json"
import posts from "@/sample-data/posts.json"
import Image from "next/image";
import style from "./user.module.sass"
import Link from "next/link";

export default function Page({params}:{params: {user: string}}){
    const user = params.user;
    const userInfo = users.find(({username})=> username === user);

    
    //Defining variables
    
    if(userInfo){
        
        const userId = userInfo.user_id;
        const name = userInfo.name;
        const profilePic = userInfo.profile_pic;
        
        const userPosts = posts.filter(({user_id})=> user_id === userId);
        return (
            <>
                <div className={style.userHeader}>
                    <Image alt={`${name}'s avatar`} src={`/images/${profilePic}.jpg`}  width={100} height={100}/>
                    <div>
                        <div className={style.heading}>
                            <h1>{name}</h1>
                            <Link href={`/${user}/edit`}>Edit Profile</Link>
                        </div>
                        <p>Description about the user no more than 50 characters.</p>
                        <div className={style.followButtons}>
                            <button className="btn">Follow</button>
                            <button className="btn">Followers</button>
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