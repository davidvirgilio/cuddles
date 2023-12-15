import SignUpForm from '@/slices/SignUpForm';
import style from '../auth.module.sass'
import { Icon } from "@/slices/Logos";

export default function Page(){
    return(
        <div className={style.signUp}>
            <h1>Sign-up</h1>
            <Icon />
            <SignUpForm />
        </div>
    )
}