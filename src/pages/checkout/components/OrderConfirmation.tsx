import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface OrderConfirmationProps {
  orderNumber: string;
  estimatedDelivery: string;
}

const OrderConfirmation = ({ orderNumber, estimatedDelivery }: OrderConfirmationProps) => {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  const handleTrackOrder = () => {
    navigate('/order-tracking');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleResendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-lg p-8 shadow-soft text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle2" size={48} className="text-success" />
          </div>
          
          <h1 className="text-3xl font-headline font-bold text-primary mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          
          <div className="bg-surface rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                <p className="text-xl font-semibold text-foreground font-mono">
                  {orderNumber}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-muted-foreground mb-2">
                  Estimated Delivery
                </p>
                <p className="text-xl font-semibold text-foreground">
                  {estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3 text-left p-4 bg-accent/10 rounded-lg">
              <Icon name="Mail" size={20} className="text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Confirmation Email Sent
                </p>
                <p className="text-xs text-muted-foreground">
                  We've sent order details and tracking information to your email address.
                </p>
                {emailSent && (
                  <p className="text-xs text-success mt-2">Email resent successfully!</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start space-x-3 text-left p-4 bg-primary/10 rounded-lg">
              <Icon name="Package" size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Track Your Order
                </p>
                <p className="text-xs text-muted-foreground">
                  You can track your order status and delivery progress using the tracking number.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 text-left p-4 bg-success/10 rounded-lg">
              <Icon name="Gift" size={20} className="text-success mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Care Kit Included
                </p>
                <p className="text-xs text-muted-foreground">
                  Your order includes a complimentary wood care kit with maintenance instructions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="Package"
              iconPosition="left"
              onClick={handleTrackOrder}
            >
              Track Order
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="ShoppingBag"
              iconPosition="left"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </div>
          
          <button
            onClick={handleResendEmail}
            className="mt-6 text-sm text-primary hover:underline"
          >
            Didn't receive email? Resend confirmation
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need help with your order?
          </p>
          <div className="flex items-center justify-center space-x-6">
            <a
              href="mailto:support@herahandcrafted.com"
              className="flex items-center space-x-2 text-sm text-primary hover:underline"
            >
              <Icon name="Mail" size={16} />
              <span>Email Support</span>
            </a>
            <a
              href="tel:+94112345678"
              className="flex items-center space-x-2 text-sm text-primary hover:underline"
            >
              <Icon name="Phone" size={16} />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;