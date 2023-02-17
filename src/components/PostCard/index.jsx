import './style.css'


export const PostCard = ({ title, cover, body, id}) => {
    return (
        <div className='post'>
            <img src={cover} alt={title}></img>
            <div className='postcard'>
                <h1 className='post-title'>{title} {id}</h1>
                <p className='post-body'>{body}</p>
            </div>
        </div>
    )
}
