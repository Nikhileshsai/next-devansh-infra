'use client';

import React from 'react';
import BlogCard from '@/components/BlogCard';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';
import { Blog } from '@/types';

interface BlogsClientProps {
  blogs: Blog[];
}

const BlogsClient: React.FC<BlogsClientProps> = ({ blogs }) => {
  const { language } = useAppContext();
  const text = UI_TEXT[language];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-text-light dark:text-text-dark">{text.blogs}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsClient;
