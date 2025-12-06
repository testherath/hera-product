import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { CustomOrderFormData, WoodType, ProductCategory, EngravingFont } from '../types';

interface OrderSummaryProps {
  formData: CustomOrderFormData;
  category: ProductCategory | undefined;
  woodType: WoodType | undefined;
  font: EngravingFont | undefined;
  onEdit: (step: number) => void;
  onSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  formData,
  category,
  woodType,
  font,
  onEdit,
  onSubmit,
}) => {
  const summaryItems = [
    {
      title: 'Product Category',
      value: category?.name || 'Not selected',
      icon: 'Package',
      step: 0,
    },
    {
      title: 'Wood Type',
      value: woodType?.name || 'Not selected',
      icon: 'Trees',
      step: 1,
    },
    {
      title: 'Dimensions',
      value: `${formData.dimensions.length}" × ${formData.dimensions.width}" × ${formData.dimensions.height}"`,
      icon: 'Ruler',
      step: 2,
    },
    {
      title: 'Engraving',
      value: formData.engraving.enabled
        ? `"${formData.engraving.text}" (${font?.name || 'Default'})`
        : 'No engraving',
      icon: 'Type',
      step: 3,
    },
    {
      title: 'Reference Images',
      value: `${formData.referenceImages.length} image(s) uploaded`,
      icon: 'Image',
      step: 4,
    },
    {
      title: 'Quantity',
      value: formData.quantity.toString(),
      icon: 'Hash',
      step: 4,
    },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
      <h3 className="text-2xl font-headline font-semibold text-primary mb-6">
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {summaryItems.map((item) => (
          <div
            key={item.title}
            className="flex items-start justify-between p-4 bg-surface rounded-lg"
          >
            <div className="flex items-start flex-1">
              <Icon name={item.icon} size={20} className="mr-3 text-accent flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-secondary mb-1">{item.title}</p>
                <p className="text-base text-text-primary">{item.value}</p>
              </div>
            </div>
            <button
              onClick={() => onEdit(item.step)}
              className="ml-4 text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-300"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {formData.specialInstructions && (
        <div className="mb-6 p-4 bg-surface rounded-lg">
          <div className="flex items-start">
            <Icon name="FileText" size={20} className="mr-3 text-accent flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary mb-2">
                Special Instructions
              </p>
              <p className="text-sm text-text-primary whitespace-pre-wrap">
                {formData.specialInstructions}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6">
        <div className="flex items-start mb-6">
          <Icon name="AlertCircle" size={20} className="mr-3 text-warning flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-text-secondary">
              By submitting this order, you agree to our custom order terms. Our artisan team
              will review your specifications and contact you within 24 hours to confirm
              feasibility, timeline, and final pricing.
            </p>
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onSubmit}
          iconName="Send"
          iconPosition="right"
        >
          Submit Custom Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;