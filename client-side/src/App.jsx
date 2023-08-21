import './App.css';
import Nav from './routes/nav/nav';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Posts from './routes/posts/posts';
import Auth from './routes/register/register';
import Login from './routes/login/login';
import NewPost from './routes/new/newPost';
import ViewPost from './routes/view/view';
import EditPost from './routes/edit/edit';
import PrivateRoutes from './routes/private';
import { useEffect} from 'react';
import { checkAuthentication} from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from './components/footer/footer';

const App = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  useEffect(() => {
    dispatch(checkAuthentication())
  }, []);

  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:id' element={<ViewPost />} />
        {/* <PrivateRoutes path='/posts/:id/edit' element={EditPost} isLoggedIn={isLoggedIn} />
        <PrivateRoutes path='/posts/new' element={NewPost} isLoggedIn={isLoggedIn} /> */}
        <Route element={<PrivateRoutes />}>
                    <Route path='/posts/:id/edit' element={<EditPost />} />
                    <Route path='/posts/new' element={<NewPost />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
