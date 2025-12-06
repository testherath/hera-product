import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { CartSummary } from '../types';

interface OrderSummaryProps {
  summary: CartSummary;
  itemCount: number;
}

const OrderSummary = ({ summary, itemCount }: OrderSummaryProps) => {
  return (
    <div className="bg-card rounded-lg p-4 lg:p-6 shadow-soft border border-border sticky top-24">
      <h3 className="font-headline text-lg font-semibold text-primary mb-4">
        Order Summary
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-semibold text-primary">
            LKR {summary.subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-semibold text-primary">
            {summary.shipping === 0 ? 'Free' : `LKR ${summary.shipping.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (VAT 15%)</span>
          <span className="font-semibold text-primary">
            LKR {summary.tax.toLocaleString()}
          </span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Discount</span>
            <span className="font-semibold text-success">
              -LKR {summary.discount.toLocaleString()}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="font-headline text-lg font-semibold text-primary">
              Total
            </span>
            <div className="text-right">
              <p className="font-headline text-xl font-semibold text-primary">
                LKR {summary.total.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                ${(summary.total / 300).toFixed(2)} USD
              </p>
            </div>
          </div>
        </div>
      </div>

      <Link to="/checkout">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="ShoppingBag"
          iconPosition="left"
          className="mb-3"
        >
          Proceed to Checkout
        </Button>
      </Link>

      <Link to="/shop">
        <Button
          variant="outline"
          size="default"
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Continue Shopping
        </Button>
      </Link>

      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Truck" size={16} />
          <span>Free shipping on orders over LKR 15,000</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="RotateCcw" size={16} />
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;