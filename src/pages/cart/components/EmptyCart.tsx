import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 rounded-full bg-surface flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={64} className="text-muted" />
      </div>

      <h2 className="font-headline text-2xl lg:text-3xl font-semibold text-primary mb-3 text-center">
        Your Cart is Empty
      </h2>

      <p className="text-muted-foreground text-center max-w-md mb-8">
        Looks like you haven't added any handcrafted treasures yet. Explore our collection of authentic Sri Lankan wooden products.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/shop">
          <Button
            variant="default"
            size="lg"
            iconName="Store"
            iconPosition="left"
          >
            Browse Products
          </Button>
        </Link>
        <Link to="/custom-orders">
          <Button
            variant="outline"
            size="lg"
            iconName="Sparkles"
            iconPosition="left"
          >
            Create Custom Order
          </Button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Icon name="Truck" size={24} className="text-primary" />
          </div>
          <h3 className="font-semibold text-primary mb-1">Free Shipping</h3>
          <p className="text-sm text-muted-foreground">On orders over LKR 15,000</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <h3 className="font-semibold text-primary mb-1">Secure Payment</h3>
          <p className="text-sm text-muted-foreground">100% secure checkout</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Icon name="RotateCcw" size={24} className="text-primary" />
          </div>
          <h3 className="font-semibold text-primary mb-1">Easy Returns</h3>
          <p className="text-sm text-muted-foreground">30-day return policy</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;