import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { EngravingFont } from '../types';

interface EngravingCustomizerProps {
  enabled: boolean;
  text: string;
  font: string;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  fonts: EngravingFont[];
  onEnabledChange: (enabled: boolean) => void;
  onTextChange: (text: string) => void;
  onFontChange: (font: string) => void;
  onPositionChange: (position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => void;
}

const EngravingCustomizer: React.FC<EngravingCustomizerProps> = ({
  enabled,
  text,
  font,
  position,
  fonts,
  onEnabledChange,
  onTextChange,
  onFontChange,
  onPositionChange,
}) => {
  const positions = [
    { value: 'center', label: 'Center', icon: 'Circle' },
    { value: 'top-left', label: 'Top Left', icon: 'ArrowUpLeft' },
    { value: 'top-right', label: 'Top Right', icon: 'ArrowUpRight' },
    { value: 'bottom-left', label: 'Bottom Left', icon: 'ArrowDownLeft' },
    { value: 'bottom-right', label: 'Bottom Right', icon: 'ArrowDownRight' },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-semibold text-primary">
          Personalized Engraving
        </h3>
        <Checkbox
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          label="Add Engraving"
        />
      </div>

      {enabled && (
        <div className="space-y-6">
          <Input
            label="Engraving Text"
            type="text"
            placeholder="Enter your custom text (max 50 characters)"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            maxLength={50}
            description={`${text.length}/50 characters`}
          />

          <Select
            label="Font Style"
            options={fonts.map((f) => ({
              value: f.id,
              label: f.name,
              description: `+LKR ${f.price.toLocaleString()}`,
            }))}
            value={font}
            onChange={(value) => onFontChange(value as string)}
            placeholder="Select a font"
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Engraving Position
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {positions.map((pos) => (
                <button
                  key={pos.value}
                  onClick={() => onPositionChange(pos.value as any)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-300 ${
                    position === pos.value
                      ? 'border-primary bg-surface shadow-soft'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon
                    name={pos.icon}
                    size={24}
                    className={position === pos.value ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span
                    className={`mt-2 text-sm font-medium ${
                      position === pos.value ? 'text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {pos.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {text && (
            <div className="p-6 bg-surface rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-3">Preview:</p>
              <div className="relative w-full h-32 bg-card rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <p
                  className="text-2xl font-headline text-primary"
                  style={{
                    fontFamily: fonts.find((f) => f.id === font)?.preview || 'inherit',
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EngravingCustomizer;