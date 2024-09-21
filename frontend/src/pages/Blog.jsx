import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import { getBlogbyid } from '../api/Api'; // Adjust the import path as necessary

const apiURL = 'http://localhost:3000/';

const Blog = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const allBlogs = await getBlogbyid(id);
        if (allBlogs && allBlogs.data && allBlogs.data.length > 0) {
          setBlog(allBlogs.data[0]);
        } else {
          console.error('No blog data found');
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className='flex justify-center items-center'>
      {blog && (
        <div className="flex flex-col w-[60%] overflow-hidden">
          <h1 className='mt-1 text-3xl font-extrabold'>{blog.title}</h1>
          <div className="flex mt-4 mb-4">
            <small>{dateFormat(blog.createdon, "mmmm dS, yyyy, h:MM TT")}</small>
          </div>
          <img className='rounded-lg' src={apiURL + blog.image} alt={blog.title} />
          <div>
            {parse(blog.post)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;