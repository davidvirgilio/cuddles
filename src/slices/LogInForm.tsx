'use client'
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LogInForm(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleEmail = (e:any)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e:any)=>{
        setPassword(e.target.value);
    }
    const handleSubmit = async (e:any)=> {
        e.preventDefault();
        try{
            const res = await signIn("credentials",{
                email,
                password,
                redirect: false,
            });
            if(res?.error){
                setError("Invalid Credentials")
                return;
            }
            
            router.push("/");
            router.refresh();
            console.log("Log in data sent");
            }catch(error){
                console.log("HEre I am",error)
            }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jbones@cuddles.ca"
                    onChange={handleEmail}
                    autoComplete="true"/>
            </div>
            <div>
                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlePassword}
                    placeholder="•••••••••"
                    autoComplete="true"
                />
            </div>
            {error && (
                <span>{error}</span>
            )}
            <button className="btn" type="submit">Continue</button>
        </form>
    )
}
