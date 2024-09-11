'use client'

import { use, useState } from "react"
import style from './forgot-password.module.sass'
import Link from "next/link";

export default function ForgotPassword(){
    const [ email, setEmail ] = useState("");
    const [ emailSent, setEmailSent ] = useState(false);
    const [ error, setError ] = useState(false);

    const handleSubmit = async(e:any)=>{
        e.preventDefault();

        const res = await fetch('/api/auth/forgot-password',{
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.ok){
            setEmailSent(true);
            setError(false);
        }else{
            setError(true);
        }

    }

    return (
        <> 
            <form onSubmit={handleSubmit} className={style.resetPasswordForm}>
                <label>
                    Enter your email
                    <input 
                        type="email" 
                        placeholder="jbones@cuddles.ca"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                </label>
                {emailSent && <p className={`${style.message} ${style.success}`}>Check your email for a password reset link</p>}
                {error && <p className={`${style.message} ${style.error}`}>Something went wrong. Try with a different email or <Link href={'/sign-up'}>sign up.</Link></p>}
                <button className={style.btn} type="submit">Send</button>
            </form>
        </>
    )
}