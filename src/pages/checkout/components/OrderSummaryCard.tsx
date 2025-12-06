import { CartItem, OrderSummary } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

interface OrderSummaryCardProps {
  items: CartItem[];
  summary: OrderSummary;
}

const OrderSummaryCard = ({ items, summary }: OrderSummaryCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-soft sticky top-24">
      <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
        Order Summary
      </h2>
      
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
              <Image
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
              {item.woodType && (
                <p className="text-sm text-muted-foreground mt-1">
                  Wood: {item.woodType}
                </p>
              )}
              {item.customization && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item.customization}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </span>
                <span className="font-semibold text-foreground">
                  LKR {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 py-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            LKR {summary.subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            LKR {summary.shipping.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax (VAT 15%)</span>
          <span className="font-medium text-foreground">
            LKR {summary.tax.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="pt-4 border-t-2 border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              LKR {summary.total.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              ≈ ${summary.usdConversion?.toFixed(2)} USD
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Package" size={20} className="text-accent mt-1" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Free Care Kit Included
            </p>
            <p className="text-xs text-muted-foreground">
              Every order includes a complimentary wood care kit with maintenance instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;