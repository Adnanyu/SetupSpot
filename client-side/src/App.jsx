import './App.css';
import Nav from './routes/nav/nav';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Posts from './routes/posts/posts';
import Auth from './components/auth.component/auth';
import Login from './routes/login/login';
import NewPost from './routes/new/newPost';
import ViewPost from './routes/view/view';
import EditPost from './routes/edit/edit';
import axios from 'axios';
import PrivateRoutes from './routes/private';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const checkIsLoggedIn = async () => {
    try {
      const response = await axios
        .get('http://localhost:8000/users', { withCredentials: true })
        .then((res) => {
          setIsLoggedIn(res.data)
          console.log(res)
        });
      // setIsLoggedIn(response.data);

    }catch (error) {
      console.error('Axios error:', error);;
      setIsLoggedIn(null);
    }
  };

  const handleLogout = async () => {
    try {
      await axios
        .get('http://localhost:8000/users/logout', {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        });
      setIsLoggedIn(null);
      checkIsLoggedIn();
      window.location.pathname = '../posts';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <div className='App'>
      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:id' element={<ViewPost isLoggedIn={isLoggedIn}/>} />
        {/* <PrivateRoutes path='/posts/:id/edit' element={EditPost} isLoggedIn={isLoggedIn} />
        <PrivateRoutes path='/posts/new' element={NewPost} isLoggedIn={isLoggedIn} /> */}
        <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
                    <Route path='/posts/:id/edit' element={<EditPost />} />
                    <Route path='/posts/new' element={<NewPost />} />
        </Route>
        ro
      </Routes>
    </div>
  );
};

export default App;
