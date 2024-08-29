/**
 * EditProfileForm component.
 * 
 * This component allows users to edit their profile information.
 * 
 * @param {object} props - Component props.
 * @param {any} props.currentUserData - Current user data.
 * @param {string} props.userId - User ID.
 * 
 * @example
 * <EditProfileForm currentUserData={{ name: 'John Doe', username: 'johndoe', email: 'johndoe@example.com' }} userId="1234567890" />
 */

'use client'

import { useState} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditProfileForm({currentUserData, userId}:{currentUserData: any, userId: string}){

    const [newData, setUser] = useState(currentUserData);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const router = useRouter();
    const { data: session, update } = useSession();

    
    const handleChange = (e:any)=>{
        const value = e.target.value;
        const name = e.target.name;
        setEnableSubmit(true);

        setUser((prevState:any)=>({
            ...prevState,
            [name]: value,
        }));
    }


    const handleSubmit = async(e:any)=>{
        e.preventDefault();

        try{
            const response = await fetch(`/api/mongodb/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify(newData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                const form = e.target;
                form.reset();
            }else{
                throw new Error('Failed to update user info');
            }

            await update(newData);
            router.push(`/${newData.username}`);
            router.refresh();
            document.body.style.overflow = '';

        }catch(error){
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">name:</label>
                <input
                    onChange={handleChange}
                    name="name"
                    id="name"
                    type="text"
                    value={newData.name}/>
            </div>
            <div>
                <label htmlFor="username">username:</label>
                <input
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    value={newData.username}/>
            </div>
            <div>
                <label htmlFor="email">email:</label>
                <input
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    value={newData.email}/>
            </div>
            {/* <div>
                <label htmlFor="about">about:</label>
                <textarea
                    onChange={handleChange}
                    id="about" placeholder="Description about the user no more than 50 characters."/>
            </div> */}
            <button type="submit" className="btn" disabled={enableSubmit ? false : true}>Save changes</button>
        </form>)
}