const ViewImage = ({post}) => {
    return (
        <div className='view-images-container'>
          {post.images.map((img) => (
            <>
              <img className='' src={img.url} alt='' />{' '}
            </>
          ))}
        </div>
    )
}
export default ViewImage