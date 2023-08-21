import { useNavigate } from "react-router-dom";
const Links = ({ post }) => {
    return (
        <div className='view-links-container' key={post.title}>
            <ul key='ffff'>
              {post.links.map((link) => (
                <>
                  <li key={link.title}>{link.name}</li>
                  <li key={link.link}>
                    <a href={link.link} target='_blank'>{link.link}</a>
                  </li>
                </>
              ))}
            </ul>
        </div>
    )
}

export default Links