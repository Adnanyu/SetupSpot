import axios from 'axios';
import { useEditPost } from './useEdit';



const EditPost = () => {
  const {
    loading,
    title,
    links,
    body,
    listCount,
    setBody,
    setImage,
    setTitle,
    handleAddField,
    handleDeletePicture,
    handleDeleteList,
    deleteListHandler,
    handleChange2,
    handleSubmit,
} = useEditPost();

  if (loading) return <h1>loading</h1>;

  return (
    <div className='auth'>
      <form action='' onSubmit={handleSubmit} className='auth-form'>
        <div className='input-container'>
          <label htmlFor='title'> title </label>
          <input
            type='text'
            name='title'
            value={title}
            id='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='image' className='file-label'>
            {' '}
            image{' '}
          </label>
          <input
            type='file'
            name='image'
            id='image'
            className='file-input'
            onChange={(e) => setImage(e.target.files)}
            multiple
          />
        </div>
        <div className='input-container'>
          <label htmlFor='links'>links</label>
          {links.map((link, index) => {
            return (
              <div key={index} className='links-container'>
                <input
                  type='text'
                  name='name'
                  value={link.name}
                  id='links'
                  onChange={(e) => handleChange2(index, 'name', e.target.value)}
                />
                <input
                  type='text'
                  name='link'
                  value={link.link}
                  id='links'
                  onChange={(e) => handleChange2(index, 'link', e.target.value)}
                />
                <input
                  type='checkbox'
                  checked={listCount.includes(index)}
                  onChange={() => handleDeleteList(index)}
                />
              </div>
            );
          })}
        </div>
        <div className='buttons-container'>
          <button type='button' onClick={handleAddField}>
            +
          </button>
          <button
            type='button'
            onClick={deleteListHandler}
            disabled={ listCount.length == 0 ? true : false }
            className='delete-selected'
          >
            Delete Selected
          </button>
        </div>
        <div className='input-container'>
          <textarea
            name=''
            id=''
            rows='4'
            placeholder='Please enter the Description...'
            onChange={(e) => setBody(e.target.value)}
          >
            {body}
          </textarea>
        </div>
        <button className='submit-button'>Edit</button>
      </form>
      {/* <div>
        <h1>image:</h1>
        {post.images.map((img) => {
          return (
            <>
              <img src={img.url} alt='' />
              <label htmlFor='imagedel'>delete</label>
              <input
                type='checkbox'
                name='imagedel[]'
                id='imagedel'
                value={img.filename}
                onChange={handleDeletePicture}
              />{' '}
              <br />
            </>
          );
        })}

        <div></div>
      </div> */}
    </div>
  );
};

export default EditPost;
