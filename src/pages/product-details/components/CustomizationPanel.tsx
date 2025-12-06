import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { WoodType, ProductSize, EngravingOption, CustomizationState } from '../types';

interface CustomizationPanelProps {
  woodTypes: WoodType[];
  sizes: ProductSize[];
  engravingOptions: EngravingOption[];
  customization: CustomizationState;
  onCustomizationChange: (customization: CustomizationState) => void;
}

const CustomizationPanel = ({
  woodTypes,
  sizes,
  engravingOptions,
  customization,
  onCustomizationChange,
}: CustomizationPanelProps) => {
  const [showEngravingPreview, setShowEngravingPreview] = useState(false);

  const handleWoodTypeChange = (value: string) => {
    onCustomizationChange({ ...customization, woodType: value });
  };

  const handleSizeChange = (value: string) => {
    onCustomizationChange({ ...customization, size: value });
  };

  const handleEngravingToggle = () => {
    onCustomizationChange({
      ...customization,
      engraving: {
        ...customization.engraving,
        enabled: !customization.engraving.enabled,
      },
    });
  };

  const handleEngravingTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomizationChange({
      ...customization,
      engraving: {
        ...customization.engraving,
        text: e.target.value,
      },
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, customization.quantity + delta);
    onCustomizationChange({ ...customization, quantity: newQuantity });
  };

  const selectedWood = woodTypes.find((w) => w.id === customization.woodType);

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl border border-border">
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary mb-4 flex items-center gap-2">
          <Icon name="Settings2" size={20} />
          Customize Your Product
        </h3>
        <p className="text-sm text-muted-foreground">
          Personalize this handcrafted piece to match your unique style and needs
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Select Wood Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {woodTypes.map((wood) => (
              <button
                key={wood.id}
                onClick={() => handleWoodTypeChange(wood.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  customization.woodType === wood.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-muted'
                }`}
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-2">
                  <img
                    src={wood.image}
                    alt={wood.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-primary text-sm">{wood.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  +{(wood.priceMultiplier * 100 - 100).toFixed(0)}%
                </p>
              </button>
            ))}
          </div>
          {selectedWood && (
            <div className="mt-3 p-3 bg-surface rounded-lg">
              <p className="text-sm text-muted-foreground">{selectedWood.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedWood.properties.map((prop, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-card text-xs text-primary rounded-full"
                  >
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Select
          label="Choose Size"
          options={sizes.map((size) => ({
            value: size.id,
            label: size.name,
            description: `${size.dimensions} - ${
              size.priceAdjustment > 0 ? '+' : ''
            }LKR ${size.priceAdjustment}`,
          }))}
          value={customization.size}
          onChange={handleSizeChange}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-primary">Add Engraving</label>
            <button
              onClick={handleEngravingToggle}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                customization.engraving.enabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-card rounded-full transition-transform duration-300 ${
                  customization.engraving.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {customization.engraving.enabled && (
            <div className="space-y-3 p-4 bg-surface rounded-lg">
              <Input
                label="Engraving Text"
                type="text"
                placeholder="Enter your custom text"
                value={customization.engraving.text}
                onChange={handleEngravingTextChange}
                description="Maximum 30 characters"
              />
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Eye"
                iconPosition="left"
                onClick={() => setShowEngravingPreview(!showEngravingPreview)}
              >
                {showEngravingPreview ? 'Hide' : 'Show'} Preview
              </Button>
              {showEngravingPreview && customization.engraving.text && (
                <div className="p-6 bg-card rounded-lg border border-border text-center">
                  <p className="text-2xl font-headline text-primary italic">
                    {customization.engraving.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Preview of engraving on wood surface
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-3">Quantity</label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={customization.quantity <= 1}
            >
              <Icon name="Minus" size={16} />
            </Button>
            <div className="flex-1 text-center">
              <span className="text-2xl font-semibold text-primary">
                {customization.quantity}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;