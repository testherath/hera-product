import React from 'react';
import Icon from '../../../components/AppIcon';
import { PriceBreakdown } from '../types';

interface PriceCalculatorProps {
  breakdown: PriceBreakdown;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ breakdown }) => {
  const priceItems = [
    { label: 'Base Price', value: breakdown.basePrice, icon: 'Package' },
    { label: 'Wood Cost', value: breakdown.woodCost, icon: 'Trees' },
    { label: 'Engraving', value: breakdown.engravingCost, icon: 'Type' },
    { label: 'Custom Dimensions', value: breakdown.dimensionCost, icon: 'Ruler' },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-soft border border-border sticky top-24">
      <h3 className="text-xl font-headline font-semibold text-primary mb-6">
        Price Breakdown
      </h3>

      <div className="space-y-4 mb-6">
        {priceItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name={item.icon} size={18} className="mr-3 text-accent" />
              <span className="text-sm text-text-secondary">{item.label}</span>
            </div>
            <span className="font-medium text-text-primary">
              LKR {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary">Subtotal</span>
          <span className="font-medium text-text-primary">
            LKR {breakdown.subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Tax (8%)</span>
          <span className="font-medium text-text-primary">
            LKR {breakdown.tax.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="border-t-2 border-primary pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-headline font-semibold text-primary">Total</span>
          <span className="text-2xl font-headline font-bold text-primary">
            LKR {breakdown.total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-start">
          <Icon name="Info" size={18} className="mr-2 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Final price may vary based on wood availability and complexity. Our team will
            contact you within 24 hours to confirm the order details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;