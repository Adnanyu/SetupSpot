import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormData from 'form-data';
import './new.css';
import { useNew } from './useNew';
const NewPost = () => {
  
  const {
    handleAddFeild,
    handleChange2,
    handleSubmit,
    title,
    links,
    image,
    body,
    counter,
    setBody,
    setImage,
    setTitle,
  } = useNew();

  return (
    <div className='auth '>
      <form action='' onSubmit={handleSubmit} className='auth-form'>
        <div className='input-container'>
          <label htmlFor='title'>title</label>
          <input
            type='text'
            name='title'
            value={title}
            id='title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
          />
        </div>
        <div className='input-container'>
          <label className='file-label' htmlFor='image'>
            image
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
          {Array.from(Array(counter)).map((count, index) => {
            return (
              <div key={index} className='links-container'>
                <input
                  type='text'
                  className=''
                  name='name'
                  value={links.name}
                  id='links'
                  onChange={(e) => handleChange2(index, 'name', e.target.value)}
                  placeholder='Item Name'
                />
                <input
                  type='text'
                  className=''
                  name='link'
                  value={links.title}
                  id='links'
                  onChange={(e) => handleChange2(index, 'link', e.target.value)}
                  placeholder='Item Link'
                />
              </div>
            );
          })}
        </div>
        <div className='buttons-container'>
          <button
            type='button'
            onClick={() => setCounter(counter - 1)}
            disabled={counter == 1 ? true : false}
          >
            -
          </button>
          <button type='button' onClick={handleAddFeild}>
            +
          </button>
        </div>
        <div className='input-container'>
          <label className='' htmlFor='body'>
            description
          </label>
          <textarea
            id='body'
            className=''
            rows='4'
            placeholder='Please enter the Description...'
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button className='submit-button'>Post</button>
      </form>
    </div>
  );
};

export default NewPost;
