
import Icon from '../../../components/AppIcon';
import { ShippingOption } from '../types';

interface ShippingSelectorProps {
  options: ShippingOption[];
  selectedOption: string;
  onSelect: (optionId: string) => void;
}

const ShippingSelector = ({ options, selectedOption, onSelect }: ShippingSelectorProps) => {
  return (
    <div className="bg-card rounded-lg p-4 lg:p-6 shadow-soft border border-border">
      <h3 className="font-headline text-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <Icon name="Truck" size={20} />
        Shipping Options
      </h3>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedOption === option.id
                ? 'border-primary bg-surface' :'border-border hover:border-muted'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => onSelect(option.id)}
              className="mt-1 w-4 h-4 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold text-primary">{option.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {option.estimatedDays}
                  </p>
                </div>
                <p className="font-semibold text-primary whitespace-nowrap">
                  {option.price === 0 ? 'Free' : `LKR ${option.price.toLocaleString()}`}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingSelector;