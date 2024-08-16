import Post from "@/slices/Post";
import { Icon } from "@/slices/Logos";
import Image from "next/image";
import style from "@/style/pages/user.module.sass"
import SignOut from "@/slices/SignOut";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Follow from "@/slices/follow";
import Link from "next/link";

const URL = process.env.NEXTAUTH_URL;


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

    const session = await getServerSession(authOptions);
    

    const sessionEmail = session?.user?.email;
    const sessionUserId = session?.user?.id;

    const userString = params.user;
    const {user} = await getUser(userString);

    const profile = user?.email == sessionEmail ? true : false;
    
    
    if(user){
        const userId = user._id;
        const {posts} = await getPosts(userId);
        const name = user.name;
        const followers = user.followers;
        const following = user.following;
        const profilePic = user.profile_pic;

        return (
            <>
                <div className={style.userHeader}>
                    <Image alt={`${name}'s avatar`} src={`/images/${profilePic}`}  width={100} height={100}/>
                    <div>
                        <div className={style.heading}>
                            <h1>{name}</h1>
                            { profile && 
                                <Link href={`/edit-profile/`} scroll={false}>...</Link>
                            }

                        </div>
                        <div className={style.rowInfo}>
                            <div className={style.userNumbers}>
                                <span className={style.number}>
                                    {posts.length}
                                </span>
                                <span>{posts.length == 1 ? "post" : "posts"}</span>
                            </div>
                            <div className={style.userNumbers}>
                                <span className={style.number}>
                                    {followers.length}
                                </span>
                                <span>{followers.length == 1 ? "follower" : "followers"}</span>
                            </div>
                            <div className={style.userNumbers}>
                                <span className={style.number}>
                                    {following.length}
                                </span>
                                <span>following</span>
                            </div>
                        </div>
                        {/* <p>Description about the user no more than 50 characters.</p> */}
                        <div className={style.rowInfo}>
                            {
                                !profile && (
                                    <Follow
                                        toFollowId={userId}
                                        followerId={sessionUserId}
                                        initialFollowersArray={followers}
                                    />
                                )
                            }
                            {profile && <>
                                <SignOut />
                            </>}
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