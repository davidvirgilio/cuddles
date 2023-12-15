import React from "react";
import style from '../auth.module.sass'
import { Icon } from "@/slices/Logos";
import LogInForm from "@/slices/LogInForm";

export default function Page(){
    return(
        <div className={style.signUp}>
            <h1>Log-in</h1>
            <Icon />
            <LogInForm />
            
        </div>
    )
}