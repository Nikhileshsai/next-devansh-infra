import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import { Blog } from '@/types';
import Icon from './Icon';
import { useAppContext } from '@/context/AppContext';

interface BlogCardProps {
  blog: Blog;
  isFeatured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, isFeatured = false }) => {
    const { language } = useAppContext();
    
    // Get the appropriate translation based on current language
    const getTranslatedTitle = () => {
        if (language === 'te' && blog.te_title) {
            return blog.te_title;
        }
        return blog.title || blog.en_title || 'No Title';
    };

    const getTranslatedDescription = () => {
        if (language === 'te' && blog.te_description) {
            return blog.te_description;
        }
        return blog.description || blog.en_description || 'No Description';
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'Asia/Kolkata',
        };
        return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
    };

    const translatedDescription = getTranslatedDescription();
    const description = isFeatured 
        ? translatedDescription?.substring(0, 80) + '...'
        : translatedDescription?.substring(0, 150) + '...';

  return (
    <Link href={`/blogs/${blog.slug}`} className="block group bg-card-light dark:bg-card-dark rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border-2 border-transparent group-hover:border-primary">
      <div className="relative h-48">
      <Image 
        src={blog.image_url || 'https://placehold.co/400x192'}
        alt={blog.title || 'Blog image'} 
        layout="fill"
        className="object-cover"
        unoptimized={blog.image_url ? blog.image_url.includes('supabase') : false}
      />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark flex-grow group-hover:text-primary transition-colors">{getTranslatedTitle()}</h3>
        <div className="flex items-center text-secondary dark:text-text-dark mt-2 text-xs">
          <Icon name="calendar_today" className="text-sm mr-1" />
          <p>{formatDate(blog.created_at)}</p>
        </div>
        <p className="text-sm text-secondary dark:text-text-dark mt-2 flex-grow">{description}</p>
        {!isFeatured && (
             <span className="text-primary font-semibold mt-4 self-start">Read More &rarr;</span>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;