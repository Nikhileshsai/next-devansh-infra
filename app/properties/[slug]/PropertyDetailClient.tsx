'use client';

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useAppContext } from '@/context/AppContext';
import Icon from '@/components/Icon';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import { WHATSAPP_NUMBER } from '@/constants';
import { UI_TEXT } from '@/constants';
import { Listing, ListingDetails, PropertyType } from '@/types';

const DetailItem: React.FC<{ label: string; value: string | number | boolean | undefined }> = ({ label, value }) => {
    if (value === undefined || value === null || value === false) return null;
    
    const displayValue = typeof value === 'boolean' ? 'Yes' : value;

    return (
        <div className="flex justify-between items-center p-4 bg-background-light dark:bg-background-dark rounded-lg">
            <span className="text-sm font-medium text-secondary dark:text-gray-400">{label}</span>
            <span className="font-semibold text-base text-text-light dark:text-text-dark">{displayValue}</span>
        </div>
    );
};

interface PropertyDetailClientProps {
  property: Listing;
}

const PropertyDetailClient: React.FC<PropertyDetailClientProps> = ({ property }) => {
    const { language } = useAppContext();
    const text = UI_TEXT[language];
    
    const getTranslatedTitle = () => {
        if (language === 'te' && property.te_title) {
            return property.te_title;
        }
        return property.title || property.en_title || 'No Title';
    };

    const getTranslatedDescription = () => {
        if (language === 'te' && property.te_description) {
            return property.te_description;
        }
        return property.description || property.en_description || 'No Description';
    };

    const getTranslatedNote = () => {
        if (language === 'te' && property.details.note_te) {
            return property.details.note_te;
        }
        return property.details.note_en || '';
    };
    
    const formatPrice = (price: string) => {
        const num = parseInt(price, 10);
        if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
        if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lac`;
        return `₹${num.toLocaleString('en-IN')}`;
    };

    // Function to create a human-readable label from a key
    const createLabel = (key: string) => {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const allDetails: { label: string; value?: string | number | boolean }[] = [
        { label: 'Price', value: formatPrice(property.price) },
        { label: 'Type', value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
    ];

    const { type, details } = property;
    const handledKeys = ['amenities', 'connectivity', 'brochure_url', 'investment_features', 'youtube_embed_url', 'note_en', 'note_te'];

    switch (type) {
        case 'plot':
            if (details.area_sq_yards) {
                allDetails.push({ label: 'Area', value: `${details.area_sq_yards.toLocaleString('en-IN')} sq. yards` });
                handledKeys.push('area_sq_yards');
            }
            if (details.survey_no) {
                allDetails.push({ label: 'Survey No.', value: details.survey_no });
                handledKeys.push('survey_no');
            }
            if (details.plot_number) {
                allDetails.push({ label: 'Plot No.', value: details.plot_number });
                handledKeys.push('plot_number');
            }
            if (details.road_facing) {
                allDetails.push({ label: 'Road Facing', value: details.road_facing });
                handledKeys.push('road_facing');
            }
            if (details.gated_community) {
                allDetails.push({ label: 'Community', value: 'Gated' });
                handledKeys.push('gated_community');
            }
            break;
        case 'flat':
            if (details.bhk) {
                allDetails.push({ label: 'BHK', value: details.bhk });
                handledKeys.push('bhk');
            }
            if (details.sq_ft) {
                allDetails.push({ label: 'Sq. Ft.', value: details.sq_ft.toLocaleString('en-IN') });
                handledKeys.push('sq_ft');
            }
            if (details.floor) {
                allDetails.push({ label: 'Floor', value: `${details.floor} of ${details.total_floors || 'N/A'}`});
                handledKeys.push('floor');
                handledKeys.push('total_floors');
            }
            if (details.furnishing) {
                allDetails.push({ label: 'Furnishing', value: details.furnishing });
                handledKeys.push('furnishing');
            }
            if (details.car_parking) {
                allDetails.push({ label: 'Car Parking', value: 'Available' });
                handledKeys.push('car_parking');
            }
            break;
        case 'villa':
            if (details.bhk) {
                allDetails.push({ label: 'BHK', value: details.bhk });
                handledKeys.push('bhk');
            }
            if (details.sq_ft) {
                allDetails.push({ label: 'Sq. Ft.', value: details.sq_ft.toLocaleString('en-IN') });
                handledKeys.push('sq_ft');
            }
            if (details.furnishing) {
                allDetails.push({ label: 'Furnishing', value: details.furnishing });
                handledKeys.push('furnishing');
            }
            if (details.private_pool) {
                allDetails.push({ label: 'Feature', value: 'Private Pool' });
                handledKeys.push('private_pool');
            }
            break;
        case 'commercial':
            if (details.floor) {
                allDetails.push({ label: 'Floor', value: details.floor });
                handledKeys.push('floor');
            }
            if (details.sq_ft) {
                allDetails.push({ label: 'Sq. Ft.', value: details.sq_ft.toLocaleString('en-IN') });
                handledKeys.push('sq_ft');
            }
            break;
        case 'agricultural':
            if (details.acres) {
                allDetails.push({ label: 'Area', value: `${details.acres.toLocaleString('en-IN')} acres` });
                handledKeys.push('acres');
            }
            if (details.survey_no) {
                allDetails.push({ label: 'Survey No.', value: details.survey_no });
                handledKeys.push('survey_no');
            }
            if (details.water_source) {
                allDetails.push({ label: 'Water Source', value: details.water_source });
                handledKeys.push('water_source');
            }
            break;
    }

    // Dynamically add all other details from the 'details' object
    if (property.details) {
        for (const [key, value] of Object.entries(property.details)) {
            if (!handledKeys.includes(key)) {
                allDetails.push({ label: createLabel(key), value: value });
            }
        }
    }

    const translatedNote = getTranslatedNote();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": property.title,
                    "description": property.description,
                    "image": property.image_urls[0],
                    "offers": {
                        "@type": "Offer",
                        "price": property.price,
                        "priceCurrency": "INR"
                    }
                }) }}
            />
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#333333] dark:text-[#F0F0F0]">{getTranslatedTitle()}</h1>
                <div className="flex items-center text-[#333333] dark:text-[#F0F0F0] mt-2">
                    <Icon name="location_on" className="mr-2" />
                    <p>{property.location}</p>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    <ImageGallery images={property.image_urls} altText={getTranslatedTitle()} />
                    {/* Details Grid (Mobile Only) */}
                    <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md lg:hidden">
                         <h2 className="text-2xl font-bold mb-4">{text.details}</h2>
                         <div className="space-y-1">
                            {allDetails.map(detail => (
                                <DetailItem key={detail.label} label={detail.label} value={detail.value} />
                            ))}
                        </div>
                    </div>
                    {/* Description */}
                    <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                        <p className="leading-relaxed text-secondary dark:text-gray-300 text-lg">{getTranslatedDescription()}</p>
                    </div>
                    {/* Investment Highlights */}
                    {property.details.investment_features && (
                        <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <Icon name="trending_up" className="text-primary mr-3" />
                                Investment Highlights
                            </h2>
                            <p className="text-lg text-secondary dark:text-gray-300">{property.details.investment_features}</p>
                        </div>
                    )}
                    {/* Amenities */}
                    {property.details.amenities && property.details.amenities.length > 0 && (
                        <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">{text.amenities}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {property.details.amenities.map(amenity => (
                                    <div key={amenity.name} className="flex items-center">
                                        <Icon name={amenity.icon} className="text-primary mr-3" />
                                        <span>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* YouTube Video */}
                    {property.details.youtube_embed_url && (
                        <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Virtual Tour</h2>
                            <div className="youtube-video-container">
                                <div dangerouslySetInnerHTML={{ __html: property.details.youtube_embed_url }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Right/Sidebar Column */}
                <div className="space-y-8">
                    {/* Details Grid (Desktop Only) */}
                    <div className="hidden lg:block p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                         <h2 className="text-2xl font-bold mb-4">{text.details}</h2>
                         <div className="space-y-1">
                            {allDetails.map(detail => (
                                <DetailItem key={detail.label} label={detail.label} value={detail.value} />
                            ))}
                        </div>
                    </div>
                    <div className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{text.connectivity}</h2>
                        <p className="whitespace-pre-line text-secondary dark:text-gray-300">{property.details.connectivity}</p>
                    </div>
                    {property.details.brochure_url && (
                        <a 
                            href={property.details.brochure_url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-hover transition-colors"
                        >
                            <Icon name="download" className="mr-3" />
                            Download Brochure
                        </a>
                    )}
                    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-md overflow-hidden">
                         <h2 className="text-2xl font-bold p-6">{text.location}</h2>
                        <div className="aspect-video" dangerouslySetInnerHTML={{ __html: property.map_embed }} />
                    </div>
                    <ContactForm />
                     <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I am interested in the property: ${getTranslatedTitle()}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
                    >
                        <Image src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp" width={24} height={24} className="mr-3"/>
                        {text.whatsapp}
                    </a>
                    {/* Important Note */}
                    {translatedNote && (
                        <div className="p-6 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">Important Note</h2>
                            <p className="text-lg text-yellow-700 dark:text-yellow-300">{translatedNote}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/properties" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-hover transition-colors">
                {text.viewAllProperties}
                <Icon name="arrow_forward" className="ml-2" />
              </Link>
            </div>
        </div>
    );
};

export default PropertyDetailClient;
