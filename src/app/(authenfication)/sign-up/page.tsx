import React from "react";
import style from '../auth.module.sass'
import { Icon } from "@/slices/logos";

export default function Page(){
    return(
        <div className={style.signUp}>
            <h1>Sign-up</h1>
            <Icon />
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="James Bones"/>
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input type="text" name="username" placeholder="jbones" max={20}/>
                </div>
                <div>
                    <label htmlFor="email">email:</label>
                    <input type="email" name="email" placeholder="jbones@duddles.ca"/>
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input type="password" name="password" placeholder="•••••••••"/>
                </div>
                <button className="btn" type="submit">Create account</button>
            </form>
        </div>
    )
}