import React, { useState, useEffect } from 'react';
import api from '../../axios';

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await api.get(`/users/${userId}`);
        setUser(userResponse.data);

        const postsResponse = await api.get(`/posts/user/${userId}`);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div>
      {user && (
        <>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <h3>Posts</h3>
          {posts.length === 0 ? (
            <p>No posts found</p>
          ) : (
            posts.map(post => <div key={post._id}><p>{post.text}</p></div>)
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
