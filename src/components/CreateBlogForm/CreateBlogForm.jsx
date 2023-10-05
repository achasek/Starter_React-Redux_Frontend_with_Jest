/* eslint-disable no-trailing-spaces */
import { useState } from 'react';

// components/page imports

// utils / API imports
// import blogService from '../../services/blogs'
import PropTypes from 'prop-types';

const CreateBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  // prior to using useRef and moving part of this function to app.js
  // i moved it because we had to pass down a lot of props from app in the error handling, and for the ToggleButton to work properly since i had trouble passing down the useRef in app to this component, so i just moved that part of the handlePost function to app where the useRef is initialized
  // const handlePost = async (event) => {
  //     event.preventDefault()

  //     try {
  //         const newBlog = await blogService.create({
  //             title, author, url
  //         })
  //         setBlogs(blogs.concat(newBlog))
  //         setTitle('')
  //         setAuthor('')
  //         setUrl('')
  //         setMessage(`Successfully posted ${newBlog.title}`)
  //         setTimeout(() => {
  //           setMessage(null)
  //         }, 5000)
  //     } catch(error) {
  //         console.log(error.name, error.message, error.response.data.error)
  //         setMessage(`Error posting blog : ${error.response.data.error}`)
  //         setTimeout(() => {
  //           setMessage(null)
  //         }, 5000)
  //         if(error.response.data.error === 'token expired: please log in again') {
  //             setTimeout(() => {
  //                 setUser(null)
  //             }, 5000)
  //         }
  //     }
  // }

  const sendBlog = (event) => {
    event.preventDefault();
    addBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h1>Post New Blog</h1>
      <form onSubmit={sendBlog}>
        <div>
          Title:
          <input
            className="title"
            name="title"
            type="text"
            placeholder="title of blog"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            className="author"
            name="author"
            type="text"
            placeholder="author of blog"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Original URL of blog:
          <input
            className="url"
            name="url"
            type="text"
            placeholder="url of blog"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="post-button" type="submit">
          Post
        </button>
      </form>
    </>
  );
};

CreateBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default CreateBlogForm;
