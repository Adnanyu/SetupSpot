import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../store/postSlice';


export const useEditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {post} = useSelector(state => state.post)
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [links, setLinks] = useState(post.links);
    const [image, setImage] = useState({});
    const [body, setBody] = useState('');
    const [listCount, setListCount] = useState([]);
    const [path, setPath] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost(id))
        
        setLinks(post.links);
        setTitle(post.title);
        setLoading(false);
        setBody(post.body);
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
        const updatedLinks = [...links];
        const updatedLink = { ...updatedLinks[index] }; 
        updatedLink[fieldName] = value;
    
        updatedLinks[index] = updatedLink; 
    
        setLinks(updatedLinks); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing(true)
        try {
            const updatedPostData = { image, title, links, path, body };
            const res = await axios.put(`http://localhost:8000/posts/${id}`, updatedPostData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/posts/${res.data.post._id}`);
            console.log(res)
            alert(res.data.message);
        } catch (err) {
            setIsEditing(false)
            console.error('Update error:', err);
            alert(err.response.data.message);
        }
        // dispatch(editPost({ image, title, links, path, body }))
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
        isEditing
    };
};
