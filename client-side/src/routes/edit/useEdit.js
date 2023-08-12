import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useEditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [links, setLinks] = useState(post.links);
    const [image, setImage] = useState({});
    const [body, setBody] = useState('');
    const [listCount, setListCount] = useState([]);
    const [path, setPath] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/posts/${id}`);
                setPost(res.data);
                setTitle(res.data.title);
                setLinks(res.data.links);
                setBody(res.data.body);
                setLoading(false);
            } catch (error) {
                console.error('Axios error:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleAddField = () => {
        setLinks((prevLinks) => [...prevLinks, { name: '', link: '' }]);
    };

    const handleDeletePicture = (e) => {
        if (e.target.checked) {
            setPath([...path, e.target.value]);
        } else {
            setPath(path.filter((item) => item !== e.target.value));
        }
    };

    const handleDeleteList = (index) => {
        if (listCount.includes(index)) {
            setListCount(listCount.filter((item) => item !== index));
        } else {
            setListCount([...listCount, index]);
        }
    };

    const deleteListHandler = () => {
        const updatedLinks = links.filter((_, index) => !listCount.includes(index));
        setLinks(updatedLinks);
        setListCount([]);
    };

    const handleChange2 = (index, fieldName, value) => {
        const updatedInputFields = [...links];
        updatedInputFields[index][fieldName] = value;

        setLinks(updatedInputFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPostData = { image, title, links, path, body };
            const res = await axios.put(`http://localhost:8000/posts/${id}`, updatedPostData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(!loading);
            navigate(`/posts/${res.data._id}`);
            console.log(res.data);
        } catch (err) {
            console.error('Update error:', err);
            alert(err.response.data.error);
        }
    };

    return {
        post,
        loading,
        title,
        links,
        image,
        body,
        listCount,
        path,
        handleAddField,
        handleDeletePicture,
        handleDeleteList,
        deleteListHandler,
        handleChange2,
        handleSubmit,
        setBody,
        setImage,
        setTitle,
    };
};
