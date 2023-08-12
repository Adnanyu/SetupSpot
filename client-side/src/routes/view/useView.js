import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useView = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get(`http://localhost:8000/posts/${id}`, { withCredentials: true })
          .then((res) => {
            setPost(res.data);
            setLoading(false);
          });
      } catch (e) {
        aler(e.message);
      }
    };
    fetch();
  }, []);

  const deleteHandler = () => {
    try {
      axios
        .delete(`http://localhost:8000/posts/${id}`, { withCredentials: true })
        .then((res) => {
          setResponse(res.data);
          navigate('/posts');
        });
    } catch (error) {
      console.error('Axios error:', error);
    }
  };
    
    return {
        deleteHandler,
        id,
        post,
        loading
    }
};
