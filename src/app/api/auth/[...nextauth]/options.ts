import { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/users";
import bcrypt from "bcryptjs"



export const authOptions:NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const {email, password} = credentials as{ email: string, password: string};
                try{
                    const user = await User.findOne({email});
                    
                    if(!user){
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    console.log(passwordMatch)
            

                    if(!passwordMatch){
                        return null;
                    }

                    return user;
                }catch(error){
                    console.log("Error", error)
                }
            }})
    ],
    pages: {
        signIn: '/log-in',
    }
};