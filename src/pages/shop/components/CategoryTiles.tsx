import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import { CategoryTile } from '../types';

interface CategoryTilesProps {
  categories: CategoryTile[];
}

const CategoryTiles = ({ categories }: CategoryTilesProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {categories.map(category => (
        <Link
          key={category.id}
          to={category.path}
          className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300"
        >
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={category.image}
              alt={category.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
            <h3 className="font-headline text-xl lg:text-2xl font-semibold text-white mb-1">
              {category.name}
            </h3>
            <p className="font-body text-sm text-white/80">
              {category.count} Products
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryTiles;