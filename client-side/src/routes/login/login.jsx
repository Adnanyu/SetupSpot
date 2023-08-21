import './login.css';
import { useLoginHook } from './useLogin';
import Spinner from '../../components/spinner/spinner';
const Login = () => {
 
  const { handleChange, handleSubmit, formData, isLoading, navigate } = useLoginHook()
  
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
        <button className='login' onClick={handleSubmit}>{isLoading? <Spinner button={'button'}/> : 'Login'}</button>
      </form>
    </div>
  );
};

export default Login;
