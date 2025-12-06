import { CheckoutFormData, ValidationErrors } from '../types';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

interface CustomerInfoFormProps {
  formData: CheckoutFormData;
  errors: ValidationErrors;
  onChange: (field: keyof CheckoutFormData, value: string | boolean) => void;
}

const CustomerInfoForm = ({ formData, errors, onChange }: CustomerInfoFormProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
        Customer Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          error={errors.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          error={errors.lastName}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          error={errors.email}
          description="Order confirmation will be sent here"
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+94 XX XXX XXXX"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          error={errors.phone}
          description="For delivery coordination"
          required
        />
      </div>
      
      <div className="mt-4">
        <Checkbox
          label="Sign up for newsletter"
          description="Receive updates on new collections and exclusive offers"
          checked={formData.newsletterSignup}
          onChange={(e) => onChange('newsletterSignup', e.target.checked)}
        />
      </div>
    </div>
  );
};

export default CustomerInfoForm;