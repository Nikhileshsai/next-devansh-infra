import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/types';
import Icon from './Icon';
import { useAppContext } from '@/context/AppContext';

interface PropertyCardProps {
  property: Listing;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const { language } = useAppContext();
    
    // Get the appropriate translation based on current language
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

    const formatPrice = (price: string) => {
        const num = parseInt(price, 10);
        if (num >= 10000000) {
            return `₹${(num / 10000000).toFixed(2)} Cr`;
        }
        if (num >= 100000) {
            return `₹${(num / 100000).toFixed(2)} Lac`;
        }
        return `₹${num.toLocaleString('en-IN')}`;
    };

    const getPropertyDetails = () => {
        const details = [];
        switch(property.type) {
            case 'plot':
                if (property.details.area_sq_yards) details.push({ icon: 'square_foot', value: `${property.details.area_sq_yards} sq. yards` });
                if (property.details.gated_community) details.push({ icon: 'gite', value: 'Gated Community' });
                break;
            case 'flat':
                if (property.details.bhk) details.push({ icon: 'king_bed', value: `${property.details.bhk} BHK` });
                if (property.details.sq_ft) details.push({ icon: 'square_foot', value: `${property.details.sq_ft} sq. ft.`});
                if (property.details.car_parking) details.push({ icon: 'local_parking', value: 'Car Parking' });
                break;
            case 'villa':
                if (property.details.bhk) details.push({ icon: 'king_bed', value: `${property.details.bhk} BHK` });
                if (property.details.sq_ft) details.push({ icon: 'square_foot', value: `${property.details.sq_ft} sq. ft.`});
                if (property.details.private_pool) details.push({ icon: 'pool', value: 'Private Pool'});
                break;
            case 'commercial':
                if (property.details.floor) details.push({ icon: 'apartment', value: `Floor ${property.details.floor}` });
                if (property.details.sq_ft) details.push({ icon: 'square_foot', value: `${property.details.sq_ft} sq. ft.`});
                break;
            case 'agricultural':
                 if (property.details.acres) details.push({ icon: 'grass', value: `${property.details.acres} acres` });
                break;
            case 'others':
                if (property.details.area) details.push({ icon: 'square_foot', value: `${property.details.area}` });
                break;
        }
        return details;
    }

  return (
    <Link href={`/properties/${property.slug}`} className="block group bg-card-light dark:bg-card-dark rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent group-hover:border-primary">
      <div className="relative">
        <Image 
          src={property.image_urls[0] || 'https://placehold.co/400x224'}
          alt={property.title || 'Property image'} 
          width={400}
          height={224}
          className="w-full h-56 object-cover"
          unoptimized={property.image_urls[0] ? property.image_urls[0].includes('supabase') : false}
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">{property.type}</div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark truncate group-hover:text-primary transition-colors">{getTranslatedTitle()}</h3>
        <div className="flex items-center text-secondary dark:text-text-dark mt-1">
          <Icon name="location_on" className="text-sm mr-1" />
          <p className="text-sm truncate">{property.location}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-bold text-primary">{formatPrice(property.price)}</div>
        </div>
        <div className="h-16 md:h-auto mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 flex flex-wrap gap-x-4 gap-y-2 text-sm text-secondary dark:text-text-dark">
            {getPropertyDetails().map(detail => (
                 <div key={detail.value} className="flex items-center">
                    <Icon name={detail.icon} className="text-base mr-1.5" />
                    <span>{detail.value}</span>
                </div>
            ))}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;