import ViewImage from '../../components/viewImage';
import axios from 'axios';
import ViewBody from '../../components/viewBody';
import dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

import './view.css';
import { useView } from './useView';


const ViewPost = ({ isLoggedIn }) => {
  // const { id } = useParams();
  // const [post, setPost] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [response, setResponse] = useState({});
  // const navigate = useNavigate();


  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       await axios
  //         .get(`http://localhost:8000/posts/${id}`, { withCredentials: true })
  //         .then((res) => {
  //           setPost(res.data);
  //           setLoading(false);
  //         });
  //     } catch (e) {
  //       aler(e.message);
  //     }
  //   };
  //   fetch();
  // }, []);

  // const deleteHandler = () => {
  //   try {
  //     axios
  //       .delete(`http://localhost:8000/posts/${id}`, { withCredentials: true })
  //       .then((res) => {
  //         setResponse(res.data);
  //         navigate('/posts');
  //       });
  //   } catch (error) {
  //     console.error('Axios error:', error);
  //   }
  // };
  const {
    deleteHandler,
    id,
    post,
    loading
} = useView()

  dayjs.extend(relativeTime);
  if (loading) return <h1>loading</h1>;
  return (
    <main className='view-container'>
      <section className='section-container'>
        <div className='header-container'>
          <h3>
            posted by: <span>{post.author.username}</span>{' '}
          </h3>
          <span className='posted-date'>{dayjs(post.createdAt).fromNow()}</span>
        </div>
        <ViewImage post={post} />
        <ViewBody post={ post } isLoggedIn={ isLoggedIn } deleteHandler={ deleteHandler } />
      </section>
    </main>
  );
};
export default ViewPost;
