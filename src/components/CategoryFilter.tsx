import React from 'react';
import { Category, SortOption } from '../types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onlyAvailable: boolean;
  onToggleOnlyAvailable: () => void;
  totalFiltered: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onlyAvailable,
  onToggleOnlyAvailable,
  totalFiltered,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
      {/* Category Pills (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                isActive
                  ? 'bg-brand text-white shadow-brand/20'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-surface-border'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sub-toolbar: Sort, Stock Filter, and Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-surface-border">
        
        {/* Count Label */}
        <div className="text-stone-500 font-medium">
          Menampilkan <span className="font-bold text-stone-900">{totalFiltered}</span> produk
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3">
          {/* In-Stock Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 hover:text-stone-900">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={onToggleOnlyAvailable}
              className="w-3.5 h-3.5 rounded text-brand focus:ring-brand border-stone-300"
            />
            <span className="font-medium">Hanya Ready Stock</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-surface-border rounded-lg px-2.5 py-1.5 shadow-sm text-stone-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent border-none text-xs font-medium text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="terbaru">Terbaru</option>
              <option value="harga-rendah">Harga Terendah</option>
              <option value="harga-tinggi">Harga Tertinggi</option>
              <option value="diskon-terbesar">Diskon Terbesar</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
