import axios from 'axios';

const apiURL = 'http://localhost:3000';

export const getBlogs = async (cat) => {
    if (!cat) {
        cat = 'all';
    }
    try {
        const result = await axios.get(`${apiURL}/blog/${cat}`);
        console.log('API response:', result.data);
        return { data: result.data }; // Wrap the response in an object with a data property
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

export const createBlog = async (data) => {
    // return blog created
    try {
        const result = await axios.post(`${apiURL}/blog`, data);
        return result.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

export const getBlogbyid = async (id) => {
    // Validate the ID parameter
    if (!id || isNaN(id)) {
        throw new Error('Invalid blog ID');
    }

    // return blog by id
    try {
        const result = await axios.get(`${apiURL}/blogbyid/${id}`);
        return result.data;
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        throw error;
    }
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const result = await axios.post(`${apiURL}/blogimage`, formData, config);
        return result.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};