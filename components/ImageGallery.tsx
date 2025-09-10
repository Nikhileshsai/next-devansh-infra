'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/legacy/image';
import Icon from './Icon';

interface ImageGalleryProps {
  images: string[];
  altText: string;
}

const Gallery: React.FC<ImageGalleryProps> = ({ images, altText }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative cursor-pointer" onClick={openModal}>
        <Image
          src={mainImage}
          alt={altText}
          layout="fill"
          className="object-cover"
          unoptimized={mainImage.includes('supabase')}
        />
      </div>
      <div className="relative">
        <div className="hidden lg:block">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-card-light dark:bg-card-dark shadow-lg rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll left"
          >
            <Icon name="chevron_left" className="text-2xl text-primary" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-card-light dark:bg-card-dark shadow-lg rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll right"
          >
            <Icon name="chevron_right" className="text-2xl text-primary" />
          </button>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-2 py-2 no-scrollbar px-16"
        >
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setMainImage(image)}
              className={`cursor-pointer aspect-square rounded-md overflow-hidden ring-2 ${
                mainImage === image ? 'ring-primary' : 'ring-transparent'
              } transition-shadow relative flex-shrink-0 w-24 h-24`}
            >
              <Image
                src={image}
                alt={`${altText} thumbnail ${index + 1}`}
                layout="fill"
                className="object-cover"
                unoptimized={image.includes('supabase')}
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={closeModal}>
          <div className="relative w-full h-full max-w-4xl max-h-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={mainImage}
              alt={altText}
              layout="fill"
              className="object-contain"
              unoptimized={mainImage.includes('supabase')}
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              <Icon name="close" className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altText }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return <Gallery images={images} altText={altText} />;
};

export default ImageGallery;
