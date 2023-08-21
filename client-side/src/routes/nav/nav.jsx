import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../store/userSlice';
import Logo from './../../assets/logo.png'
import './nav.css'
const Nav = () => {
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  return (
    <>
      <nav className=''>
        <div className='logo-container' role='button' onClick={() => navigate('/posts')}><img src={Logo} alt="" /></div>
        <div className=''>
          {currentUser ? (
            <div className="nav-links-container">
              <a className="nav-links" onClick={() => navigate('posts/new')}>+</a>{' '}
              <a className='nav-links' onClick={() => dispatch(logOutUser())}>
                logout
              </a>
            </div>
          ) : (
            <div className="nav-links-container">
              <Link className="nav-links" to='/register'>register</Link>
              <Link className="nav-links" to='/login'>login</Link>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
