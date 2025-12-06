import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

interface DimensionControlsProps {
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  onChange: (dimension: 'length' | 'width' | 'height', value: number) => void;
}

const DimensionControls: React.FC<DimensionControlsProps> = ({ dimensions, onChange }) => {
  const handleSliderChange = (dimension: 'length' | 'width' | 'height', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onChange(dimension, numValue);
    }
  };

  const dimensionConfig = [
    { key: 'length' as const, label: 'Length', icon: 'ArrowRight', min: 6, max: 48, unit: 'inches' },
    { key: 'width' as const, label: 'Width', icon: 'ArrowUp', min: 6, max: 36, unit: 'inches' },
    { key: 'height' as const, label: 'Height', icon: 'Layers', min: 0.5, max: 4, unit: 'inches', step: 0.25 },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
      <h3 className="text-xl font-headline font-semibold text-primary mb-6">
        Customize Dimensions
      </h3>
      <div className="space-y-6">
        {dimensionConfig.map((config) => (
          <div key={config.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon name={config.icon} size={20} className="mr-2 text-accent" />
                <label className="font-medium text-text-primary">{config.label}</label>
              </div>
              <span className="text-lg font-semibold text-primary">
                {dimensions[config.key]} {config.unit}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min={config.min}
                max={config.max}
                step={config.step || 1}
                value={dimensions[config.key]}
                onChange={(e) => handleSliderChange(config.key, e.target.value)}
                className="flex-1 h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <Input
                type="number"
                value={dimensions[config.key]}
                onChange={(e) => handleSliderChange(config.key, e.target.value)}
                min={config.min}
                max={config.max}
                step={config.step || 1}
                className="w-24"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{config.min} {config.unit}</span>
              <span>{config.max} {config.unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-secondary">Total Area:</span>
          <span className="text-lg font-semibold text-primary">
            {(dimensions.length * dimensions.width / 144).toFixed(2)} sq ft
          </span>
        </div>
      </div>
    </div>
  );
};

export default DimensionControls;