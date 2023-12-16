'use client'
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { hashPassword } from "@/slices/hash";

export default function SignUpForm(){
    const startingUserData = {
        username: "",
        name: "",
        password: "",
        email: "",
        profile_pic: "avatar1",
        followers: [],
        following: [],
    }

    const [formData, setFormData] = useState(startingUserData);
    const [error, setError] = useState("");
    const router = useRouter();

    
    //Form handles
    const handleChange = (e:any)=>{
        const value = e.target.value;
        const name = e.target.name;
        
        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        
        try{
            const email = formData.email;
            const resUserExists = await fetch("/api/mongodb/userExists", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( {email} ),
            });

            const {user} = await resUserExists.json();
            if(user){
                setError("This user already exists.");
                return;
            }


            const hashedPassword:string = await hashPassword(formData.password);
            const updatedFormData = {...formData, password: hashedPassword};
            // console.log(updatedFormData)

            const res = await fetch("/api/mongodb/users", {
                method:"POST",
                body: JSON.stringify({updatedFormData}),
                headers:{
                    "Content-type": "application/json"
                },
            });

            if(res.ok){
                const form = e.target;
                form.reset();
            }else{
                throw new Error('Failed to create user');
            }

            router.refresh();
            router.push("/");


            //  console.log("Submitted");
        }catch(error){
            console.error(error);
        }
    }

    return(
        <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="James Bones"
                        autoComplete="true"
                        required={true}
                        value={formData.name}
                    />
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="jbones"
                        maxLength={20}
                        autoComplete="true"
                        required={true}
                        value={formData.username}
                    />
                </div>
                <div>
                    <label htmlFor="email">email:</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="jbones@duddles.ca"
                        autoComplete="true"
                        required={true}
                        value={formData.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="•••••••••"
                        required={true}
                        value={formData.password}
                    />
                </div>
                {error && (
                    <span>{error}</span>
                )}

                <button className="btn" type="submit">Create account</button>
        </form>
    )
}