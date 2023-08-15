import save from '../assets/save.svg'
import heart from '../assets/heart.svg'
import '../routes/view/view.css'
import axios from 'axios'

const ViewFooter = ({post, isLoggedIn}) => {
    const likeHandler  = async () => {
        try {
            await axios.post(`http://localhost:8000/posts/${post._id}/like`, null, { withCredentials: true }).then(res => {
                post.likes = res.data.likes
                alert(res.data.message)
            })
        } catch (e) {
            console.log(e)
        }

    }
    const saveHandler = async() => {
        try {
            await axios.post('http://localhost:8000/users/favorites', { id: post._id }, { withCredentials: true }).then(res => {
                isLoggedIn.favorites = res.data.favorites;
                alert(res.data.message)
            })
            // if (response.data) {
            //     isLoggedIn.favorites = response.data.favorites;// Assuming the response structure has updatedFavorites field
            
            // }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='view-footer'>
            <button className='heart-button' style={{backgroundColor: post.likes.includes(isLoggedIn._id) ? 'red' : 'white'  }} onClick={ likeHandler }  >like</button>
            <button onClick={saveHandler}  style={{backgroundColor: isLoggedIn.favorites.includes(post._id) ? 'red' : 'green'  }} >save</button>
        </div>
    )
}
export default ViewFooter