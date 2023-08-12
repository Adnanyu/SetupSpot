import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/logo.png'
import './nav.css'
const Nav = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className=''>
        <div className='logo-container' role='button' onClick={() => navigate('/')}><img src={Logo} alt="" /></div>
        <div className=''>
          {isLoggedIn ? (
            <div className="nav-links-container">
              <a className="nav-links" onClick={() => navigate('posts/new')}>+</a>{' '}
              <a className='nav-links' onClick={handleLogout}>
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
