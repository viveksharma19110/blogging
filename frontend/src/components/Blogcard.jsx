import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoApps } from "react-icons/io5";

const Blogcard = ({ blogdata }) => {
    const apiURL = 'http://localhost:3000/';
    const [imageUrl, setImageUrl] = useState('');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        let fullImageUrl = blogdata.image;
        if (fullImageUrl && !fullImageUrl.startsWith('http')) {
            fullImageUrl = apiURL + fullImageUrl.replace(/\\/g, '/');
        }
        setImageUrl(fullImageUrl);
        console.log('Image URL:', fullImageUrl);
    }, [blogdata.image]);

    const handleImageError = () => {
        console.error('Error loading image:', imageUrl);
        setImageError(true);
    };

    const truncatePost = (post, maxLength = 100) => {
        if (post.length <= maxLength) return post;
        return post.substr(0, maxLength) + '...';
    };

    return (
        <div className='bg-white shadow-md overflow-hidden rounded-xl'>
            <Link to={`/blog/${blogdata.id}`}>
                <div className="flex flex-col w-full">
                    {imageUrl && !imageError ? (
                        <div 
                            className="w-full h-[250px] bg-no-repeat bg-cover bg-center" 
                            style={{backgroundImage: `url(${imageUrl})`}}
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Image not available</span>
                        </div>
                    )}
                    <div className='p-4'>
                        <h5 className='mt-1 text-left text-xl font-semibold'>{blogdata.title}</h5>
                        <p className='flex justify-start items-center opacity-70 mt-2'>
                            <IoApps />
                            <span className='text-sm text-left ml-2'>{blogdata.category || 'Uncategorized'}</span>
                        </p>
                        <div className='mt-3 text-sm text-gray-600'>
                            {truncatePost(blogdata.post)}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Blogcard;