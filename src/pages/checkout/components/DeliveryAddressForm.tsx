import { CheckoutFormData, ValidationErrors } from '../types';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

interface DeliveryAddressFormProps {
  formData: CheckoutFormData;
  errors: ValidationErrors;
  onChange: (field: keyof CheckoutFormData, value: string | boolean) => void;
}

const DeliveryAddressForm = ({ formData, errors, onChange }: DeliveryAddressFormProps) => {
  const provinces = [
    { value: 'western', label: 'Western Province' },
    { value: 'central', label: 'Central Province' },
    { value: 'southern', label: 'Southern Province' },
    { value: 'northern', label: 'Northern Province' },
    { value: 'eastern', label: 'Eastern Province' },
    { value: 'north-western', label: 'North Western Province' },
    { value: 'north-central', label: 'North Central Province' },
    { value: 'uva', label: 'Uva Province' },
    { value: 'sabaragamuwa', label: 'Sabaragamuwa Province' }
  ];

  const countries = [
    { value: 'lk', label: 'Sri Lanka' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'ca', label: 'Canada' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
        Delivery Address
      </h2>
      
      <div className="space-y-4">
        <Input
          label="Address Line 1"
          type="text"
          placeholder="Street address, P.O. box"
          value={formData.addressLine1}
          onChange={(e) => onChange('addressLine1', e.target.value)}
          error={errors.addressLine1}
          required
        />
        
        <Input
          label="Address Line 2"
          type="text"
          placeholder="Apartment, suite, unit, building, floor, etc."
          value={formData.addressLine2 || ''}
          onChange={(e) => onChange('addressLine2', e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            error={errors.city}
            required
          />
          
          <Select
            label="Province"
            placeholder="Select province"
            options={provinces}
            value={formData.province}
            onChange={(value) => onChange('province', value as string)}
            error={errors.province}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Postal Code"
            type="text"
            placeholder="Enter postal code"
            value={formData.postalCode}
            onChange={(e) => onChange('postalCode', e.target.value)}
            error={errors.postalCode}
            required
          />
          
          <Select
            label="Country"
            placeholder="Select country"
            options={countries}
            value={formData.country}
            onChange={(value) => onChange('country', value as string)}
            error={errors.country}
            required
          />
        </div>
        
        <div className="mt-4">
          <Checkbox
            label="Save this address for future orders"
            checked={formData.saveAddress}
            onChange={(e) => onChange('saveAddress', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;