import style from '../../auth.module.sass'
import Image from 'next/image'
import Link from 'next/link'


export default function Page(){
    return(
        <div className={style.avatar}>
            <h1>Choose an Avatar</h1>
            <div>
                <Image alt='Green Budgie' src={'/images/avatar1.jpg'} width={640} height={960}/>
                <Image alt='Black dog' src={'/images/avatar2.jpg'} width={640} height={886}/>
                <Image alt='White kitten' src={'/images/avatar3.jpg'} width={640} height={669}/>
            </div>
            <Link className='btn' href={"/"}>Continue</Link> 
        </div>
    )
}