import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card.component/card';
import Spinner from '../../components/spinner/spinner';
import { getAllPosts } from '../../store/postsSlice';

import './posts.css'
const Posts = () => {
  const { posts,isLoading } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
  }, []);
  
  
  return (
    isLoading ? <Spinner /> :
    <main className='post-container'>
      {posts.map((post) => {
        return <Card key={post._id} post={post} />;
      })}
    </main>
  );
};

export default Posts;
