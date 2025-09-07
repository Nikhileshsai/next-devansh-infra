'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  altText: string;
}

const Gallery: React.FC<ImageGalleryProps> = ({ images, altText }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image 
                src={mainImage} 
                alt={altText} 
                width={800}
                height={450}
                className="w-full h-full object-cover"
                unoptimized={mainImage.includes('supabase')}
                />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {images.map((image, index) => (
                <div
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`cursor-pointer aspect-square rounded-md overflow-hidden ring-2 ${mainImage === image ? 'ring-primary' : 'ring-transparent'} transition-shadow`}
                >
                    <Image 
                    src={image} 
                    alt={`${altText} thumbnail ${index + 1}`} 
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    unoptimized={image.includes('supabase')}
                    />
                </div>
                ))}
            </div>
        </div>
    );
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altText }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return <Gallery images={images} altText={altText} />;
};

export default ImageGallery;
