import React, { useEffect, useState } from 'react';
import Blogcard from '../components/Blogcard';
import { getBlogs } from '../api/Api';
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [searchParams] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                setError(null);
                const category = searchParams.get('category');
                const response = await getBlogs(category);
                console.log('Component received:', response);
                if (response && Array.isArray(response.data)) {
                    setBlogs(response.data);
                } else {
                    throw new Error('Invalid data received from API');
                }
            } catch (err) {
                setError(err.message || 'An error occurred while fetching blogs');
                setBlogs([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [searchParams]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
            {searchParams.get('category') && (
                <h2 className="text-xl mb-4">Category: {searchParams.get('category')}</h2>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Blogcard key={blog.id} blogdata={blog} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-600">
                        No blogs found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;