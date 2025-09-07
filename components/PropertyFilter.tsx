'use client';

import React from 'react';
import { PropertyType } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { UI_TEXT } from '@/constants';

interface PropertyFilterProps {
  activeFilter: PropertyType;
  onFilterChange: (filter: PropertyType) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ activeFilter, onFilterChange }) => {
    const { language } = useAppContext();
    const text = UI_TEXT[language];

  const filters: { label: string; value: PropertyType }[] = [
    { label: text.filterAll, value: 'all' },
    { label: text.filterPlot, value: 'plot' },
    { label: text.filterFlat, value: 'flat' },
    { label: text.filterVilla, value: 'villa' },
    { label: text.filterCommercial, value: 'commercial' },
    { label: text.filterAgricultural, value: 'agricultural' },
    { label: text.filterOthers, value: 'others' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            activeFilter === filter.value
              ? 'bg-sky-900 text-white shadow-md'
              : 'bg-sky-100 dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default PropertyFilter;
