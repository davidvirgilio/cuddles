'use client'
import { useState} from "react";

export default function EditProfileForm({currentUserData}:{currentUserData: any}){

    const [userData, setUser] = useState(currentUserData);

    
    const handleChange = (e:any)=>{
        const value = e.target.value;
        const name = e.target.name;

        setUser((prevState:any)=>({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <form>
            <div>
                <label htmlFor="name">name:</label>
                <input
                    onChange={handleChange}
                    name="name"
                    id="name"
                    type="text"
                    value={userData.name}/>
            </div>
            <div>
                <label htmlFor="username">username:</label>
                <input
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    value={userData.username}/>
            </div>
            <div>
                <label htmlFor="email">email:</label>
                <input
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}/>
            </div>
            <div>
                <label htmlFor="about">about:</label>
                <textarea
                    onChange={handleChange}
                    id="about" placeholder="Description about the user no more than 50 characters."/>
            </div>
            <button type="submit" className="btn">Save changes</button>
        </form>)
}