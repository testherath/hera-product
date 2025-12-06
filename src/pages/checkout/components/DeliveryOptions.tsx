import { useState } from 'react';
import { CheckoutFormData, ValidationErrors, DeliveryOption } from '../types';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

interface DeliveryOptionsProps {
  formData: CheckoutFormData;
  errors: ValidationErrors;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const DeliveryOptions = ({ formData, errors, onChange }: DeliveryOptionsProps) => {
  const [selectedDelivery, setSelectedDelivery] = useState<string>('standard');

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Delivery within 5-7 business days',
      estimatedDays: '5-7 days',
      price: 500
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Delivery within 2-3 business days',
      estimatedDays: '2-3 days',
      price: 1500
    },
    {
      id: 'premium',
      name: 'Premium Delivery',
      description: 'Next day delivery with white glove service',
      estimatedDays: '1 day',
      price: 3000
    }
  ];

  const handleDeliverySelect = (optionId: string) => {
    setSelectedDelivery(optionId);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
        Delivery Options
      </h2>
      
      <div className="space-y-4 mb-6">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleDeliverySelect(option.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
              selectedDelivery === option.id
                ? 'border-primary bg-surface' :'border-border hover:border-muted'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                    selectedDelivery === option.id
                      ? 'border-primary bg-primary' :'border-border'
                  }`}
                >
                  {selectedDelivery === option.id && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{option.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {option.estimatedDays}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  LKR {option.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${(option.price / 300).toFixed(2)} USD
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Preferred Delivery Date"
          type="date"
          value={formData.deliveryDate}
          onChange={(e) => onChange('deliveryDate', e.target.value)}
          error={errors.deliveryDate}
          description="Select your preferred delivery date"
          required
        />
        
        <Input
          label="Preferred Time Slot"
          type="time"
          value={formData.deliveryTime}
          onChange={(e) => onChange('deliveryTime', e.target.value)}
          error={errors.deliveryTime}
          description="Choose a convenient time"
          required
        />
      </div>
      
      <div className="mt-4">
        <Input
          label="Special Instructions"
          type="text"
          placeholder="Any special delivery instructions or notes"
          value={formData.specialInstructions || ''}
          onChange={(e) => onChange('specialInstructions', e.target.value)}
          description="Optional: Gate codes, parking instructions, etc."
        />
      </div>
    </div>
  );
};

export default DeliveryOptions;