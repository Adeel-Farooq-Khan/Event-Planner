import React from 'react';
import { Filter as FilterIcon } from 'lucide-react';

const Filter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: 'all', label: 'All Events', count: 0 },
    { value: 'work', label: 'Work', count: 0 },
    { value: 'personal', label: 'Personal', count: 0 },
    { value: 'other', label: 'Other', count: 0 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <FilterIcon className="w-6 h-6 text-purple-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Filter Events</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === category.value
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;