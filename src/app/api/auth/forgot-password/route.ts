import { Resend } from 'resend'
import { generateResetToken } from '@/lib/token'
import User from '@/models/users'
import { NextResponse } from 'next/server';
import EmailTemplate from '@/ui/components/reset-email/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request){

    const body = await req.json();
    const email = body.email;

    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({error: 'User not found'},{status:404})
    }
    
    const userId = user.id;
    const name = user.name;

    const resetToken = generateResetToken(userId);
    const resetLink = `${process.env.NEXT_PUBLIC_URL}/reset-password/${resetToken}`;

    try{
        const { data, error } = await resend.emails.send({
            from: 'no-reply@cuddles.davidvirgilio.me',
            to: email,
            subject: 'Reset Password',
            react: EmailTemplate({name, resetLink})

        });

        if(error){
            console.error(error);
            return NextResponse.json({ error }, { status: 500 });
        }
        return NextResponse.json({data})
    }catch(error){
        return NextResponse.json({error},{status:500});
    }
}