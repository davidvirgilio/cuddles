

interface EmailTemplateProps{
    name: string,
    resetLink: string,

}

export default function EmailTemplate({name, resetLink}:EmailTemplateProps){

    const firstName = name.split(' ')[0];
    
    return (
        <div>
            <p>Hi {firstName},</p>
            <p>Follow this link to change your password and access to your account: {resetLink}</p>
            <p><strong>Important:</strong> This link will expire in 15 minutes.</p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
            <p>Thank you for using Cuddles.</p>
        </div>
    )
}