import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useNew = () => {
  const [title, setTitle] = useState('');
  const [links, setLinks] = useState([{ name: '', link: '' }]);
  const [image, setImage] = useState([]);
  const [body, setBody] = useState('');
  const [counter, setCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleAddFeild = () => {
    setCounter(counter + 1);
    setLinks((prevLinks) => [...prevLinks, { name: '', link: '' }]);
  };

  const handleChange2 = (index, fieldName, value) => {
    const updatedInputFields = [...links];
    updatedInputFields[index][fieldName] = value;

    setLinks(updatedInputFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await axios
        .post(
          'http://localhost:8000/posts',
          { image, title, links, body },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          console.log(res)
          navigate(`/posts/${res.data.post._id}`);
        });
    } catch (err) {
      console.log(err)
      alert(err.response.data.message);
      setIsLoading(false)
    }
  };
    
    
    
    return {
        handleAddFeild,
        handleChange2,
        handleSubmit,
        title,
        links,
        image,
        body,
        counter,
        setBody,
        setImage,
        setTitle,
        setCounter,
        isLoading
    }
};
