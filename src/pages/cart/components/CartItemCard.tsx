import { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { CartItem } from '../types';

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}

const CartItemCard = ({ item, onQuantityChange, onRemove, onSaveForLater }: CartItemCardProps) => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleRemoveClick = () => {
    setShowRemoveDialog(true);
  };

  const confirmRemove = () => {
    onRemove(item.id);
    setShowRemoveDialog(false);
  };

  return (
    <>
      <div className="bg-card rounded-lg p-4 lg:p-6 shadow-soft border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-surface">
            <Image
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-headline text-lg lg:text-xl font-semibold text-primary mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Icon name="TreePine" size={16} />
                    {item.woodType}
                  </span>
                  {item.customization && (
                    <span className="flex items-center gap-1">
                      <Icon name="Sparkles" size={16} />
                      {item.customization}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="font-headline text-xl font-semibold text-primary">
                  LKR {item.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ${(item.price / 300).toFixed(2)} USD
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={handleQuantityDecrease}
                    disabled={item.quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center font-semibold text-primary border-x border-border">
                    {item.quantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrease}
                    className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  {item.inStock ? (
                    <>
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-success">In Stock</span>
                    </>
                  ) : (
                    <>
                      <Icon name="AlertCircle" size={16} className="text-warning" />
                      <span className="text-warning">Low Stock</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSaveForLater(item.id)}
                  iconName="Heart"
                  iconPosition="left"
                  iconSize={16}
                >
                  Save for Later
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveClick}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={16}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Truck" size={16} />
              <span>Estimated delivery: {item.estimatedDelivery}</span>
            </div>
          </div>
        </div>
      </div>

      {showRemoveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full shadow-soft">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-headline text-lg font-semibold text-primary mb-2">
                  Remove Item
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Are you sure you want to remove "{item.name}" from your cart?
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRemoveDialog(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={confirmRemove}
                    fullWidth
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItemCard;