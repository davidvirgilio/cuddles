/**
 * Page Title: Username | Cuddles
 * Description: Users' profile dynamic page that shows the user's files and data.
 * Route Path: /username
 * Layout: 'DashboardLayout'
 * Data Fetching: It fetches user's posts array and information.
 * Props: params: username
 * Events: None.
 */

// Stylesheet:
import style from "./profile.module.sass"

// Components:
import Post from "@/ui/components/show-posts/show-posts";
import SignOut from "@/ui/components/sign-out-button";
import FollowButton from "@/ui/components/follow-button";
import S3Image from "@/ui/components/image-from-s3-bucket";

// Imports
import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { notFound } from "next/navigation";
import { getUser, getUserPosts, getUsers } from "@/lib/get";

export const revalidate = 60;

// export const dynamicParams = true

export async function generateStaticParams() {
    const {users} = await getUsers() as any;
   
    return users.map((user: any) => ({
      username: user.username,
    }))
  }

// An asynchronous function allows certain operations to be executed without blocking the main thread, enabling the program to continue running other tasks while waiting for a long-running operation to complete.
export default async function Profile({params}:{params: {username: string}}){ 

    // Get the user session from NextAuth.
    const session = await getServerSession(authOptions); // Session data for server components

    // Define user data based on session
    const isCurrentUser = session?.user.username === params.username ; 
    const sessionUserId = session?.user?.id;
    
    // Read the username from the current route to get dynamic behavior.
    const username = params.username;
    
    // It fetches the user posts array
    const {userData} = await getUser(username);
    
    // Condition to render the page if the user is found in the database or returns a 404 page.
    if(userData){


        // Defining the variables from the db.
        const userId = userData._id;
        const name = userData.name;
        const followers = userData.followers;
        const following = userData.following;
        const profilePhoto = userData.profile_pic;

        // Fetching user's post array.
        const {posts} = await getUserPosts(userId);

        return (
            <>
            
                <div className={    style.header    }>

                    <S3Image
                        src={  profilePhoto  } 
                        alt={  `${name}'s profile picture` } 
                        width={100} 
                        height={100}
                    />

                    <div>

                        <div className={    style.heading   }>
                            <h1>{   name   }</h1>
                            { isCurrentUser &&  <Link href={`/edit-profile/`} scroll={false}> ... </Link> }
                        </div>

                        <div className={    style.rowInfo   }>

                            <div className={    style.userNumbers   }>
                                <span className={   style.number   }> {   posts.length   } </span>
                                <span> {    posts.length == 1 ? "post" : "posts"    } </span>
                            </div>

                            <div className={    style.userNumbers   }>
                                <span className={   style.number   }> {   followers.length   } </span>
                                <span>{ followers.length == 1 ? "follower" : "followers" }</span>
                            </div>

                            <div className={style.userNumbers}>
                                <span className={   style.number    }> {   following.length    } </span>
                                <span>following</span>
                            </div>

                        </div>

                        <div className={    style.rowInfo   }>
                            { isCurrentUser ?
                                    <SignOut />
                                    :
                                    <FollowButton
                                        toFollowId={    userId  }
                                        followerId={    sessionUserId   }
                                        initialFollowersArray={ followers    }
                                    />
                            }
                        </div>
                    </div>
                </div>

                <Post 
                    posts={  posts } 
                    isProfile={ isCurrentUser  }
                />
            </>

        )
    }else{
        return notFound();
    }
}