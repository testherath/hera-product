import { useState } from 'react';
import { CheckoutFormData, ValidationErrors, PaymentMethod } from '../types';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

interface PaymentSelectionProps {
  formData: CheckoutFormData;
  errors: ValidationErrors;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const PaymentSelection = ({ formData: _formData, errors, onChange }: PaymentSelectionProps) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('card');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express',
      enabled: true
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'Building2',
      description: 'Direct bank transfer',
      enabled: true
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'Wallet',
      description: 'PayPal, Google Pay, Apple Pay',
      enabled: true
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: 'Banknote',
      description: 'Pay when you receive',
      enabled: true
    }
  ];

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
    onChange('paymentMethod', methodId);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
        Payment Method
      </h2>

      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => method.enabled && handlePaymentSelect(method.id)}
            className={`border-2 rounded-lg p-4 transition-all duration-300 ${method.enabled ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
              } ${selectedPayment === method.id
                ? 'border-primary bg-surface' : 'border-border hover:border-muted'
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id
                      ? 'border-primary bg-primary' : 'border-border'
                    }`}
                >
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                    <Icon name={method.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
              </div>
              {method.enabled && (
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedPayment === 'card' && (
        <div className="space-y-4 p-4 bg-surface rounded-lg">
          <Input
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            error={errors.cardNumber}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              type="text"
              placeholder="MM/YY"
              error={errors.expiryDate}
              required
            />
            <Input
              label="CVV"
              type="text"
              placeholder="123"
              error={errors.cvv}
              required
            />
          </div>
          <Input
            label="Cardholder Name"
            type="text"
            placeholder="Name on card"
            error={errors.cardholderName}
            required
          />
        </div>
      )}

      {selectedPayment === 'bank' && (
        <div className="p-4 bg-surface rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-1" />
            <div>
              <p className="text-sm text-foreground font-medium mb-2">
                Bank Transfer Instructions
              </p>
              <p className="text-sm text-muted-foreground">
                After placing your order, you will receive bank account details via email. Please complete the transfer within 24 hours to confirm your order.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-1" />
          <div>
            <p className="text-sm font-medium text-success mb-1">Secure Payment</p>
            <p className="text-xs text-muted-foreground">
              Your payment information is encrypted and secure. We use SSL encryption and comply with PCI standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection;