import Spinner from '../../components/spinner/spinner';
import { useAuth } from './useAuth';

const Auth = () => {
  
  const { handleChange, handleSubmit, formData, isLoading, navigate } = useAuth()

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
        <button className='sign-up' onClick={handleSubmit}>{isLoading ? <Spinner button={'button'} /> : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default Auth;
