import style from './no-posts.module.sass'


export default function NoPosts(){
    return (
        <div className={style.noPosts}>
            <span>No posts yet</span>
        </div>
    )
}