import Image from "next/image"

function Icon(){
    return(
        <Image src="/assets/logo.svg" alt='Cuddles logo' width={193} height={174} priority/>
    )
}
function Logo(){
    return(
        <Image src="/assets/logo-horizontal.svg" alt='Cuddles logo' width={165.6} height={36} priority/>
    )
}

export {Icon, Logo}