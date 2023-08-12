import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../../components/card.component/card';
import './posts.css'
const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      axios
        .get('http://localhost:8000/posts', { withCredentials: true })
        .then((res) => {
          setPosts(res.data);
        });
    } catch (error) {
      console.error('Axios error:', error);;
    }
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
