import { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

const ProductCard = ({
  product,
  onQuickView,
  onAddToWishlist,
  isWishlisted
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div
        className="relative aspect-square overflow-hidden bg-surface"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/shop/${product.id}`}>
          <Image
            src={product.images[currentImageIndex].url}
            alt={product.images[currentImageIndex].alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {product.discount && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </div>
        )}

        {product.featured && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-card text-foreground px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onQuickView(product)}
            aria-label="Quick view"
            className="bg-card/90 backdrop-blur-sm"
          >
            <Icon name="Eye" size={18} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onAddToWishlist(product.id)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="bg-card/90 backdrop-blur-sm"
          >
            <Icon
              name={isWishlisted ? 'Heart' : 'Heart'}
              size={18}
              color={isWishlisted ? 'var(--color-destructive)' : 'currentColor'}
            />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            to={`/shop/${product.id}`}
            className="flex-1 min-w-0"
          >
            <h3 className="font-body text-base font-semibold text-primary truncate hover:text-secondary transition-colors">
              {product.name}
            </h3>
          </Link>
          {product.customizable && (
            <Icon
              name="Palette"
              size={16}
              className="text-accent flex-shrink-0"
            />
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Icon name="Star" size={14} className="text-accent fill-accent" />
            <span className="font-body text-sm text-foreground font-medium">
              {product.rating}
            </span>
          </div>
          <span className="font-body text-xs text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        <p className="font-body text-xs text-muted-foreground mb-3">
          {product.woodType} • {product.artisan}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-body text-lg font-bold text-primary">
              LKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-body text-sm text-muted-foreground line-through">
                LKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;