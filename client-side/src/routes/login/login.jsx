import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          'http://localhost:8000/users/login',
          { ...formData },
          { withCredentials: true }
        )
        .then((res) => alert(res.data));
      window.location.pathname = '../posts';
    } catch (err) {
      alert(err.response.data);
    }

    console.log(formData);
  };
  
  return (
    <div className='auth'>
      <form action='' onSubmit={ handleSubmit } className='auth-form login'>
        <h2>Login</h2>
        <div className='input-container'>
          <label htmlFor='username'> username </label>
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
        <p>Dont have an account? <span className='auth-span' onClick={()=> navigate('/register')}>Register</span></p>
        <button className='login' onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
