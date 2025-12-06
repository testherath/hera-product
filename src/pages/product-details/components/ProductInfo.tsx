import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Product } from '../types';

interface ProductInfoProps {
  product: Product;
  currentPrice: number;
  onAddToCart: () => void;
}

const ProductInfo = ({ product, currentPrice, onAddToCart }: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
            {product.category}
          </span>
          {product.sustainabilityCertified && (
            <span className="px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full flex items-center gap-1">
              <Icon name="Leaf" size={14} />
              Eco-Certified
            </span>
          )}
        </div>
        <h1 className="text-4xl font-headline font-semibold text-primary mb-3">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name={i < Math.floor(product.rating) ? 'Star' : 'Star'}
                size={18}
                color={i < Math.floor(product.rating) ? 'var(--color-accent)' : 'var(--color-muted)'}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="p-6 bg-surface rounded-xl border border-border">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl font-headline font-semibold text-primary">
            LKR {currentPrice.toLocaleString()}
          </span>
          <span className="text-lg text-muted-foreground">
            (≈ ${(currentPrice / 300).toFixed(2)} USD)
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {product.inStock ? (
            <>
              <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
              <span className="text-success font-medium">In Stock - Ready to Ship</span>
            </>
          ) : (
            <>
              <Icon name="Clock" size={16} color="var(--color-warning)" />
              <span className="text-warning font-medium">Made to Order - 2-3 Weeks</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" iconName="Heart" iconPosition="left">
            Save
          </Button>
          <Button variant="outline" size="lg" iconName="Share2" iconPosition="left">
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6 bg-card rounded-xl border border-border">
        <div className="text-center">
          <Icon name="Truck" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
          <p className="text-sm font-medium text-primary">Free Shipping</p>
          <p className="text-xs text-muted-foreground">Orders over LKR 5,000</p>
        </div>
        <div className="text-center">
          <Icon name="Shield" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
          <p className="text-sm font-medium text-primary">Lifetime Support</p>
          <p className="text-xs text-muted-foreground">Care & restoration</p>
        </div>
        <div className="text-center">
          <Icon name="Award" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
          <p className="text-sm font-medium text-primary">Handcrafted</p>
          <p className="text-xs text-muted-foreground">100% authentic</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;