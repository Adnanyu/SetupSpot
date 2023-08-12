import Links from "./linksContainer"
import { useNavigate } from "react-router-dom";

const ViewBody = ({ post, isLoggedIn, deleteHandler }) => {

    const navigate = useNavigate();
    return (
        <div className='view-body-container'>
          <h2>{post.title}</h2>
          <div className='view-description-container'>
            <p>{post.body}</p>
          </div>
          <Links post={post} />
          {isLoggedIn == post.author._id.toString() ? (
            <div className='buttons-container'>
              <button onClick={() => navigate(`/posts/${post._id}/edit`)}>
                Edit
              </button>
              <button onClick={deleteHandler}>Delete</button>
            </div>
          ) : (
            <></>
          )}
        </div>
    )
}
export default ViewBody