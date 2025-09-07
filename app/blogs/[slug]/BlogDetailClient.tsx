'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';
import { Blog } from '@/types';

interface BlogDetailClientProps {
  blog: Blog;
}

const BlogDetailClient: React.FC<BlogDetailClientProps> = ({ blog }) => {
    const { language } = useAppContext();
    const text = UI_TEXT[language];
    
    // Get the appropriate translation based on current language
    const getTranslatedTitle = () => {
        if (language === 'te' && blog.te_title) {
            return blog.te_title;
        }
        return blog.title || blog.en_title || 'No Title';
    };

    const getTranslatedContent = () => {
        if (language === 'te' && blog.te_content) {
            return blog.te_content;
        }
        return blog.content || blog.en_content || 'No Content';
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Kolkata',
        };
        return new Intl.DateTimeFormat(language === 'te' ? 'te-IN' : 'en-IN', options).format(new Date(dateString));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
            <article>
                <header className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">{getTranslatedTitle()}</h1>
                    <div className="flex items-center justify-center text-secondary dark:text-gray-400">
                        <Icon name="calendar_today" className="text-lg mr-2" />
                        <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
                    </div>
                </header>
                
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src={blog.image_url} 
                      alt={getTranslatedTitle()} 
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                      style={{maxHeight: '500px'}}
                      unoptimized={blog.image_url.includes('supabase')}
                    />
                </div>

                <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-secondary dark:text-gray-300">
                   <p>{getTranslatedContent()}</p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                     <Link href="/blogs" className="inline-flex items-center text-primary hover:text-primary-hover font-semibold">
                        <Icon name="arrow_back" className="mr-2" />
                        Back to All Blogs
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default BlogDetailClient;
