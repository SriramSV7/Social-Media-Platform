import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div>
      <p>{post.text}</p>
      {post.image && <img src={`http://localhost:5000/uploads/images/${post.image}`} alt="Post" />}
      <button>Like</button>
      <button>Comment</button>
    </div>
  );
};

export default PostItem;
