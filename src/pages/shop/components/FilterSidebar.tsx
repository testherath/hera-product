import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { FilterOptions } from '../types';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onReset,
  isMobileOpen,
  onMobileClose
}: FilterSidebarProps) => {
  const [priceMin, setPriceMin] = useState(filters.priceRange.min);
  const [priceMax, setPriceMax] = useState(filters.priceRange.max);

  const categories = [
    { value: 'kitchen', label: 'Kitchen Essentials' },
    { value: 'home-decor', label: 'Home Décor' },
    { value: 'custom', label: 'Custom Creations' }
  ];

  const woodTypes = [
    'Teak',
    'Mahogany',
    'Ebony',
    'Rosewood',
    'Coconut Wood',
    'Jak Wood'
  ];

  const artisans = [
    'Sunil Perera',
    'Nimal Fernando',
    'Chaminda Silva',
    'Pradeep Kumar',
    'Ranjith Bandara'
  ];

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleWoodTypeToggle = (woodType: string) => {
    const newWoodTypes = filters.woodTypes.includes(woodType)
      ? filters.woodTypes.filter(w => w !== woodType)
      : [...filters.woodTypes, woodType];
    onFilterChange({ ...filters, woodTypes: newWoodTypes });
  };

  const handleArtisanToggle = (artisan: string) => {
    const newArtisans = filters.artisans.includes(artisan)
      ? filters.artisans.filter(a => a !== artisan)
      : [...filters.artisans, artisan];
    onFilterChange({ ...filters, artisans: newArtisans });
  };

  const handlePriceChange = () => {
    onFilterChange({
      ...filters,
      priceRange: { min: priceMin, max: priceMax }
    });
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-lg font-semibold text-primary">
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-primary"
        >
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-body text-sm font-semibold text-primary mb-3">
            Categories
          </h4>
          <div className="space-y-2">
            {categories.map(category => (
              <Checkbox
                key={category.value}
                label={category.label}
                checked={filters.categories.includes(category.value)}
                onChange={() => handleCategoryToggle(category.value)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-body text-sm font-semibold text-primary mb-3">
            Wood Type
          </h4>
          <div className="space-y-2">
            {woodTypes.map(wood => (
              <Checkbox
                key={wood}
                label={wood}
                checked={filters.woodTypes.includes(wood)}
                onChange={() => handleWoodTypeToggle(wood)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-body text-sm font-semibold text-primary mb-3">
            Price Range (LKR)
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Min"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Max"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={handlePriceChange}
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-body text-sm font-semibold text-primary mb-3">
            Artisan
          </h4>
          <div className="space-y-2">
            {artisans.map(artisan => (
              <Checkbox
                key={artisan}
                label={artisan}
                checked={filters.artisans.includes(artisan)}
                onChange={() => handleArtisanToggle(artisan)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-body text-sm font-semibold text-primary mb-3">
            Availability
          </h4>
          <div className="space-y-2">
            <Checkbox
              label="In Stock Only"
              checked={filters.inStock === true}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  inStock: e.target.checked ? true : null
                })
              }
            />
            <Checkbox
              label="Customizable"
              checked={filters.customizable === true}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  customizable: e.target.checked ? true : null
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
          {sidebarContent}
        </div>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onMobileClose}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-card shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-xl font-semibold text-primary">
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMobileClose}
                  aria-label="Close filters"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;