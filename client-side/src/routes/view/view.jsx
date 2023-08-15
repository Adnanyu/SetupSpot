import ViewImage from '../../components/viewImage';
import axios from 'axios';
import ViewBody from '../../components/viewBody';
import dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

import './view.css';
import { useView } from './useView';
import ViewFooter from '../../components/viewFooter';


const ViewPost = ({ isLoggedIn }) => {
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
        <ViewImage post={ post } isLoggedIn={ isLoggedIn } />
        <ViewBody post={ post } isLoggedIn={ isLoggedIn } deleteHandler={ deleteHandler } />
        
      </section>
    </main>
  );
};
export default ViewPost;
