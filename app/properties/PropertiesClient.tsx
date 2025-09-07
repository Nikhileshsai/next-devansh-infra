'use client';

import React, { useState, useMemo } from 'react';
import { PropertyType, Listing } from '@/types';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';

interface PropertiesClientProps {
  listings: Listing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings }) => {
    const { language } = useAppContext();
    const [activeFilter, setActiveFilter] = useState<PropertyType>('all');
    const text = UI_TEXT[language];

    const filteredListings = useMemo(() => {
        let filtered = listings;
        if (activeFilter !== 'all') {
            filtered = listings.filter(listing => listing.type === activeFilter);
        }
        // Limit to maximum 15 properties
        return filtered.slice(0, 15);
    }, [listings, activeFilter]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-text-light dark:text-text-dark">{text.properties}</h1>
            <PropertyFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredListings.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {filteredListings.length === 0 && (
                <p className="text-center text-secondary dark:text-gray-400 mt-8">No properties found for this category.</p>
            )}
        </div>
    );
};

export default PropertiesClient;
