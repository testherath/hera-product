import React from 'react';
import Image from '../../../components/AppImage';
import { ProductCategory } from '../types';

interface CategorySelectorProps {
  categories: ProductCategory[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
            selectedCategory === category.id
              ? 'ring-4 ring-primary shadow-lg scale-105'
              : 'hover:shadow-soft hover:scale-102'
          }`}
        >
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={category.image}
              alt={category.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-xl font-headline font-semibold text-primary-foreground mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-primary-foreground/90 mb-3">
              {category.description}
            </p>
            <p className="text-lg font-semibold text-accent">
              Starting at LKR {category.basePrice.toLocaleString()}
            </p>
          </div>
          {selectedCategory === category.id && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;