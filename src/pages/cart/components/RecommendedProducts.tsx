import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { RecommendedProduct } from '../types';

interface RecommendedProductsProps {
  products: RecommendedProduct[];
  onAddToCart: (productId: string) => void;
}

const RecommendedProducts = ({ products, onAddToCart }: RecommendedProductsProps) => {
  return (
    <div className="bg-surface rounded-lg p-4 lg:p-6">
      <h3 className="font-headline text-xl font-semibold text-primary mb-4 flex items-center gap-2">
        <Icon name="Sparkles" size={24} />
        You Might Also Like
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg overflow-hidden shadow-soft border border-border hover:shadow-lg transition-shadow"
          >
            <Link to="/product-details">
              <div className="aspect-square overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              <Link to="/product-details">
                <h4 className="font-headline text-base font-semibold text-primary mb-2 hover:text-secondary transition-colors line-clamp-2">
                  {product.name}
                </h4>
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary">
                    LKR {product.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${(product.price / 300).toFixed(2)} USD
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAddToCart(product.id)}
                  iconName="Plus"
                  iconSize={16}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;