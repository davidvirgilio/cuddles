import Image from "next/image"
import Link from "next/link"

function Icon(){
    return(
        <Link className="logo" href={"/"}>
            <Image src="/assets/logo.svg" alt='Cuddles logo' width={193} height={174} priority/>
        </Link>
    )
}
function Logo(){
    return(
        <Link className="logo" href={"/"}>
            <Image src="/assets/logo-horizontal.svg" alt='Cuddles logo' width={165.6} height={36} priority/>
        </Link>
    )
}

export {Icon, Logo}