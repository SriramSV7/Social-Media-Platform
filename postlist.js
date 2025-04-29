import React, { useState, useEffect } from 'react';
import api from '../../axios';
import PostItem from './Post/PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');  // Make sure the backend is sending all posts
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts to display</p>
      ) : (
        posts.map(post => <PostItem key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
