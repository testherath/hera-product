import { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10"
          aria-label="Close quick view"
        >
          <Icon name="X" size={24} />
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-surface">
              <Image
                src={product.images[selectedImageIndex].url}
                alt={product.images[selectedImageIndex].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-primary' :'border-border hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="font-headline text-2xl font-semibold text-primary mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-accent fill-accent" />
                  <span className="font-body text-sm font-medium">
                    {product.rating}
                  </span>
                </div>
                <span className="font-body text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-body text-2xl font-bold text-primary">
                  LKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-lg text-muted-foreground line-through">
                    LKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="font-body text-sm text-foreground mb-4">
                {product.description}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="TreePine" size={16} className="text-secondary" />
                  <span className="font-body text-sm text-foreground">
                    Wood Type: {product.woodType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="User" size={16} className="text-secondary" />
                  <span className="font-body text-sm text-foreground">
                    Artisan: {product.artisan}
                  </span>
                </div>
                {product.dimensions && (
                  <div className="flex items-center gap-2">
                    <Icon name="Ruler" size={16} className="text-secondary" />
                    <span className="font-body text-sm text-foreground">
                      Dimensions: {product.dimensions}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-body text-sm font-semibold text-primary">
                  Quantity:
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="font-body text-base font-semibold text-primary w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Link to={`/product-details?id=${product.id}`} className="flex-1">
                  <Button variant="outline" fullWidth>
                    View Details
                  </Button>
                </Link>
              </div>

              {product.customizable && (
                <Link to="/custom-orders" className="block mt-3">
                  <Button variant="secondary" fullWidth iconName="Palette" iconPosition="left">
                    Customize This Product
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;