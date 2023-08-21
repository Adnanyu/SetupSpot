import './edit.css'
import { useEditPost } from './useEdit';
import Spinner from '../../components/spinner/spinner';

const EditPost = () => {
  const {
    loading,
    title,
    links,
    body,
    listCount,
    post,
    isEditing,
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

  if (loading) return <Spinner />

  return (
    <main className='edit-container'>
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
            images max: 5
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
        <label htmlFor="">images</label>
        <div className='edit-images-container'>
        {post.images.map((img) => {
          return (
            <div className='edit-images' key={img.path}>
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
            </div>
          );
        })}
      </div>
        <div className='input-container'>
          <label htmlFor='links'>links</label>
          {links.map((link, index) => {
            return (
              <div key={index} className='links-container'>
                <input key={index}
                  type='text'
                  name='name'
                  value={link.name}
                  id='links'
                  onChange={(e) => handleChange2(index, 'name', e.target.value)}
                />
                <input key={index + 1}
                  type='text'
                  name='link'
                  value={link.link}
                  id='links'
                  onChange={(e) => handleChange2(index, 'link', e.target.value)}
                />
                <input key={index + 2}
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
            onChange={ (e) => setBody(e.target.value) }
            defaultValue={body}
          >
          </textarea>
        </div>
        <button style={ { isadbled: isEditing ? true : false}} className='submit-button'>{isEditing ? <Spinner button={'button'}/> : 'Edit'}</button>
      </form>
    </main>
  );
};

export default EditPost;
