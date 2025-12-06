import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

interface PromoCodeInputProps {
  onApply: (code: string) => void;
  appliedCode?: string;
  onRemove: () => void;
}

const PromoCodeInput = ({ onApply, appliedCode, onRemove }: PromoCodeInputProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (!code.trim()) {
      setError('Please enter a promo code');
      return;
    }
    onApply(code.trim().toUpperCase());
    setError('');
  };

  return (
    <div className="bg-card rounded-lg p-4 lg:p-6 shadow-soft border border-border">
      <h3 className="font-headline text-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <Icon name="Tag" size={20} />
        Promo Code
      </h3>

      {appliedCode ? (
        <div className="flex items-center justify-between p-3 bg-success/10 border border-success rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="font-semibold text-success">Code Applied</p>
              <p className="text-sm text-success/80">{appliedCode}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            iconName="X"
            iconSize={16}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              error={error}
              className="mb-0"
            />
          </div>
          <Button
            variant="secondary"
            onClick={handleApply}
            className="whitespace-nowrap"
          >
            Apply
          </Button>
        </div>
      )}

      <div className="mt-3 text-xs text-muted-foreground">
        <p>Available codes: WELCOME10, CRAFT15, HERITAGE20</p>
      </div>
    </div>
  );
};

export default PromoCodeInput;