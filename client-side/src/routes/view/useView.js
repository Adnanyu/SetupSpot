import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { getPost } from "../../store/postSlice";

export const useView = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { post, isLoading} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPost(id))
  }, []);

  const deleteHandler = () => {
    const backEndLink = import.meta.env.BACKEND_URL|| 'http://localhost:8000'
    try {
      axios
        .delete(`${backEndLink}/posts/${id}`, { withCredentials: true })
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
        isLoading
    }
};
