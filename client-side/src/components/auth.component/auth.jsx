import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    lastname: '',
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          'http://localhost:8000/users',
          { ...formData },
          { withCredentials: true }
        )
        .then((res) => alert(res.data.message));
    } catch (err) {
      alert(err.response);
    }

    console.log(formData);
  };
  return (
    <div className='auth'>
      <form action='' onSubmit={handleSubmit} className='auth-form signup'>
        <h2>register</h2>
        <div className='input-container'>
          <label htmlFor='name'> name </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            id='name'
            onChange={ handleChange }
            placeholder='Name'
          />
        </div>
        <div className='input-container'>
          <label htmlFor='lastname'> lastname </label>
          <input
            type='text'
            name='lastname'
            value={formData.lastname}
            id='lastname'
            onChange={ handleChange }
            placeholder='Lastname'
          />
        </div>
        <div className='input-container'>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            id='username'
            onChange={ handleChange }
            placeholder='Username'
          />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            id='password'
            onChange={ handleChange }
            placeholder='Password'
          />
        </div>
        <p>Already have an account? <span className='auth-span' onClick={()=> navigate('/login')}>Login</span></p>
        <button className='sign-up' onClick={handleSubmit}>Sign Up</button>
      </form>
      {/* <div>
        <h1>name: {formData.name}</h1>
        <h1>username: {formData.lastname}</h1>
        <h1>username: {formData.username}</h1>
        <h1>password: {formData.password}</h1>
        <div></div>
      </div> */}
    </div>
  );
};

export default Auth;
