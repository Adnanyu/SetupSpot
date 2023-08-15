import ViewFooter from "./viewFooter"
const ViewImage = ({ post, isLoggedIn }) => {
    return (
        <div className='view-images-container'>
          {post.images.map((img) => (
            <>
              <img className='' src={ img.url } alt='' />{ ' ' }
            </>
          )) }
        <ViewFooter post={ post } isLoggedIn={ isLoggedIn } />
        </div>
    )
}
export default ViewImage