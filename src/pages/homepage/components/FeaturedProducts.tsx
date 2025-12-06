import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { FeaturedProduct } from '../types';

interface FeaturedProductsProps {
  products: FeaturedProduct[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Featured Handcrafted Pieces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved creations, each piece telling a unique story of Sri Lankan craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
            >
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {product.isNew && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-success text-success-foreground text-xs font-semibold rounded-full">
                    New
                  </div>
                )}
                
                {product.isBestseller && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    Bestseller
                  </div>
                )}

                {product.customizable && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={16} color="var(--color-primary)" />
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to="/product-details">
                    <Button variant="default" size="sm" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {product.category}
                  </span>
                  {product.customizable && (
                    <span className="text-xs text-accent font-medium">Customizable</span>
                  )}
                </div>

                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Icon
                      key={index}
                      name="Star"
                      size={14}
                      color={index < Math.floor(product.rating) ? 'var(--color-accent)' : 'var(--color-muted)'}
                      className={index < Math.floor(product.rating) ? 'fill-current' : ''}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    className="w-9 h-9 rounded-full bg-surface hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                    aria-label="Add to cart"
                  >
                    <Icon name="ShoppingCart" size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;