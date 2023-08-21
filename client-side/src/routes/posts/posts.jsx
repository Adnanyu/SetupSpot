import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card.component/card';
import { getAllPosts } from '../../store/postsSlice';

import './posts.css'
const Posts = () => {
  const { posts } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
  }, []);
  return (
    <main className='post-container'>
      {posts.map((post) => {
        return <Card key={post._id} post={post} />;
      })}
    </main>
  );
};

export default Posts;
