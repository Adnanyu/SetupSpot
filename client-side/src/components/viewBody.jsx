import Links from "./linksContainer"
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux/es/hooks/useSelector';

const ViewBody = ({ deleteHandler }) => {
  
  const {currentUser} = useSelector(state => state.user)
  const { post } = useSelector(state => state.post)
    const navigate = useNavigate();
    return (
        <div className='view-body-container'>
          <h2>{post.title}</h2>
          <div className='view-description-container'>
            <p>{post.body}</p>
          </div>
          <Links post={post} />
          {currentUser && currentUser._id == post.author._id ? (
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