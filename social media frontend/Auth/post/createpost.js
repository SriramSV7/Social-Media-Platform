import React, { useState } from 'react';
import api from '../../axios';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Post created!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
