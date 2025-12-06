import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { WoodType } from '../types';

interface WoodSelectorProps {
  woodTypes: WoodType[];
  selectedWood: string;
  onSelect: (woodId: string) => void;
}

const WoodSelector: React.FC<WoodSelectorProps> = ({
  woodTypes,
  selectedWood,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {woodTypes.map((wood) => (
        <button
          key={wood.id}
          onClick={() => onSelect(wood.id)}
          className={`group relative bg-card rounded-xl overflow-hidden transition-all duration-300 ${
            selectedWood === wood.id
              ? 'ring-4 ring-primary shadow-lg'
              : 'hover:shadow-soft border border-border'
          }`}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-48 h-48 overflow-hidden">
              <Image
                src={wood.image}
                alt={wood.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 p-6 text-left">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-headline font-semibold text-primary">
                  {wood.name}
                </h3>
                {selectedWood === wood.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                    <Icon name="Check" size={16} color="var(--color-primary-foreground)" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{wood.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Icon name="Palette" size={16} className="mr-2 text-accent" />
                  <span className="text-text-secondary">Color: {wood.color}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Icon name="Shield" size={16} className="mr-2 text-accent" />
                  <span className="text-text-secondary">Durability: {wood.durability}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Icon name="Layers" size={16} className="mr-2 text-accent" />
                  <span className="text-text-secondary">Texture: {wood.texture}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-lg font-semibold text-primary">
                  LKR {wood.pricePerSqFt.toLocaleString()} per sq ft
                </p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default WoodSelector;