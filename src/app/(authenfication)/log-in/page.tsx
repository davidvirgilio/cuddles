import React from "react";
import style from '../auth.module.sass'
import { Icon } from "@/slices/logos";

export default function Page(){
    return(
        <div className={style.signUp}>
            <h1>Log-in</h1>
            <Icon />
            <form>
                <div>
                    <label htmlFor="username">username or email:</label>
                    <input type="text" name="username" placeholder="James Bones" max={20}/>
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input type="password" name="password" placeholder="•••••••••"/>
                </div>
                <button className="btn" type="submit">Continue</button>
            </form>
        </div>
    )
}