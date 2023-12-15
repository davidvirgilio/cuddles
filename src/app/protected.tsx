import { useSession } from "next-auth/react";

export default function Admin(){
    const { status } = useSession({
        required: true,
        onUnauthenticated(){
            return false;
        },
    });

    if(status === "loading"){
        return false;
    }

    return true;
}