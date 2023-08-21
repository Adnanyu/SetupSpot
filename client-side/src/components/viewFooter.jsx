import Save from './save';
import SaveFill from './saveFill';
import '../routes/view/view.css'
import { likePost } from '../store/postSlice';
import { savePost } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Heart from  'react-heart'

const ViewFooter = () => {
    const { currentUser } = useSelector(state => state.user)
    const { post } = useSelector(state => state.post)
    const dispatch = useDispatch()

    return (
        currentUser ? <div className='view-footer'>
            <div style={{display: 'flex', alignItems:'center', gap: '5px'}}><span>{post.likes.length}</span><Heart animationScale = {1.25} isActive={currentUser && post.likes.includes(currentUser._id)} onClick={ ()=> dispatch(likePost(post._id))} style={{ width: "2rem" }} /></div>
            <div onClick={ () => dispatch(savePost(post._id)) }> {currentUser && currentUser.favorites.includes(post._id) ? <SaveFill className="checked"/> : <Save style={{marginRight: '1em' + '1em'}}/> }</div>            
        </div> : <></>
    )
}
export default ViewFooter