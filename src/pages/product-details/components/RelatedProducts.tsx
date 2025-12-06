import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { RelatedProduct } from '../types';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-semibold text-primary">
          You May Also Like
        </h2>
        <Link to="/shop">
          <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to="/product-details"
            className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-soft"
          >
            <div className="aspect-square overflow-hidden bg-surface">
              <Image
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">{product.category}</span>
                <h3 className="font-medium text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-primary">
                  LKR {product.price.toLocaleString()}
                </span>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} color="var(--color-accent)" />
                  <span className="text-sm text-muted-foreground">{product.rating}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Quick Add
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;