import { Icon } from '@/ui/components/logos/logo-versions'
import LogInForm from "@/ui/forms/log-ing-form";
import Link from "next/link";

export default function Login(){
    return(
        <>
            <h1>Log-in</h1>
            <Icon />
            <LogInForm />
            <Link href={'/recover'}>Forgot password?</Link>
        </>
    )
}