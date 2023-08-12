import { Link, useNavigate } from "react-router-dom"
import './card.css'

const Card = ({ post }) => {

    const navigate = useNavigate()

    return (
        <section className="post-card" key={post._id}  onClick={() => navigate(`/posts/${post._id}`) }>
            <h2 className="post-card-title" >{ post.title }</h2>
            <div>
                <img src={ post.images[0].url } alt=""  className="post-card-image"/>
            </div>
        </section>
    )
}

export default Card