import users from "@/sample-data/users.json"
import Image from "next/image";
import style from "./edit.module.sass"

export default function Page({params}:{params: {user: string}}){
    const user = params.user;
    const userInfo = users.find(({username})=> username === user);

    //Data
    const name = userInfo?.name;
    const email = userInfo?.email;
    const picture = userInfo?.profile_pic;

    return(
        <div className={style.profile}>
            <div className={style.profilePic}>
                <Image alt={`${user}'s picture`} src={`/images/${picture}.jpg`} width={100} height={100}/>
                <span>Change profile picture</span>
            </div>
            <form>
                <div>
                    <label htmlFor="name">name:</label>
                    <input id="name" type="text" value={name}/>
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input id="username" type="text" value={user}/>
                </div>
                <div>
                    <label htmlFor="email">email:</label>
                    <input id="email" type="email" value={email}/>
                </div>
                <div>
                    <label htmlFor="about">about:</label>
                    <textarea id="about" placeholder="Description about the user no more than 50 characters."/>
                </div>
                <button type="submit" className="btn">Save changes</button>
            </form>
        </div>
    )
}