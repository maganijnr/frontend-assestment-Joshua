import React from 'react';
import Button from '../atom/button';

export default function FilterSheet({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  isLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isLoading?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out pl-6 pr-6 py-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold mb-4">Categories</h3>
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading categories...</div>
          ) : (
            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectCategory("");
                }}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedCategory === "" 
                    ? "bg-blue-100 text-blue-900 font-medium" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                All Categories
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md capitalize transition-colors ${
                    selectedCategory === cat 
                      ? "bg-blue-100 text-blue-900 font-medium" 
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {typeof cat === 'string' ? cat.replace("-", " ") : String(cat)}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button onClick={onClose} className="w-full">
            Show Results
          </Button>
        </div>
      </div>
    </>
  );
}
