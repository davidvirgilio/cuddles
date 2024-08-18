'use client'
import Image from "next/image"
import { useSession } from "next-auth/react"

export default function EditProfilePicture(){

    const {data: session} = useSession();
    const profilePicture = session?.user.profile_pic as string;
    const name = session?.user.name

    return (
        <>
        <figure>
            <Image
                alt={`${name}'s picture`}
                src={`https://s3.eu-west-3.amazonaws.com/cuddles.storage/${profilePicture}`}
                width={200}
                height={200}
            />
        </figure>
            <button className="btn">Upload a new picture</button>
            <button className="btn">Remove</button>
        </>
    )
}