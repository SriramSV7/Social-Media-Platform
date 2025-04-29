import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../axios';
import PostItem from '../components/Post/PostItem';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    }

    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [history]);

  return (
    <div>
      <h1>Home Feed</h1>
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
