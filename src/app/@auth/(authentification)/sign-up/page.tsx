import React from "react";
import style from '../auth.module.sass'
import { Icon } from "@/slices/Logos";

export default function Page(){
    return(
        <div className={style.signUp}>
            <h1>Sign-up</h1>
            <Icon />
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="James Bones" autoComplete="true"/>
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input type="text" id="username" placeholder="jbones" max={20} autoComplete="true"/>
                </div>
                <div>
                    <label htmlFor="email">email:</label>
                    <input type="email" id="email" placeholder="jbones@duddles.ca" autoComplete="true"/>
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input type="password" id="password" placeholder="•••••••••"/>
                </div>
                <button className="btn" type="submit">Create account</button>
            </form>
        </div>
    )
}