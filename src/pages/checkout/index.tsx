import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import CheckoutProgress from './components/CheckoutProgress';
import CustomerInfoForm from './components/CustomerInfoForm';
import DeliveryAddressForm from './components/DeliveryAddressForm';
import DeliveryOptions from './components/DeliveryOptions';
import PaymentSelection from './components/PaymentSelection';
import OrderSummaryCard from './components/OrderSummaryCard';
import OrderConfirmation from './components/OrderConfirmation';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import {
  CheckoutFormData,
  ValidationErrors,
  CartItem,
  OrderSummary,
  CheckoutStep } from
'./types';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'lk',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: '',
    paymentMethod: 'card',
    newsletterSignup: false,
    termsAccepted: false,
    saveAddress: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const steps: CheckoutStep[] = [
  {
    id: 1,
    title: 'Information',
    description: 'Contact details',
    completed: false
  },
  {
    id: 2,
    title: 'Delivery',
    description: 'Address & options',
    completed: false
  },
  {
    id: 3,
    title: 'Payment',
    description: 'Payment method',
    completed: false
  },
  {
    id: 4,
    title: 'Review',
    description: 'Confirm order',
    completed: false
  }];


  const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Handcrafted Teak Cutting Board',
    image: "https://images.unsplash.com/photo-1530310753722-ad9195fa1024",
    alt: 'Rectangular teak wood cutting board with natural grain patterns on white marble countertop',
    price: 8500,
    quantity: 1,
    woodType: 'Teak',
    customization: 'Engraved: "The Johnson Family"'
  },
  {
    id: '2',
    name: 'Mahogany Serving Tray',
    image: "https://images.unsplash.com/photo-1696177236690-ad5a281b9c2f",
    alt: 'Oval mahogany serving tray with brass handles on wooden dining table',
    price: 12000,
    quantity: 2,
    woodType: 'Mahogany'
  }];


  const orderSummary: OrderSummary = {
    subtotal: 32500,
    shipping: 1500,
    tax: 5100,
    total: 39100,
    currency: 'LKR',
    usdConversion: 130.33
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleFieldChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 1) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.province) newErrors.province = 'Province is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
      if (!formData.deliveryTime) newErrors.deliveryTime = 'Delivery time is required';
    }

    if (step === 2) {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    }

    if (step === 3) {
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderNumber = `HH${Date.now().toString().slice(-8)}`;
      setOrderNumber(generatedOrderNumber);
      setIsProcessing(false);
      setShowConfirmation(true);
    }, 2000);
  };

  if (showConfirmation) {
    const deliveryDate = new Date(formData.deliveryDate);
    const formattedDate = deliveryDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    return (
      <OrderConfirmation
        orderNumber={orderNumber}
        estimatedDelivery={formattedDate} />);


  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300">

              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm font-medium">Back to Cart</span>
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-headline font-bold text-primary mb-2">
              Checkout
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete your order in a few simple steps
            </p>
          </div>

          <CheckoutProgress steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {currentStep === 0 &&
              <CustomerInfoForm
                formData={formData}
                errors={errors}
                onChange={handleFieldChange} />

              }

              {currentStep === 1 &&
              <>
                  <DeliveryAddressForm
                  formData={formData}
                  errors={errors}
                  onChange={handleFieldChange} />

                  <DeliveryOptions
                  formData={formData}
                  errors={errors}
                  onChange={handleFieldChange} />

                </>
              }

              {currentStep === 2 &&
              <PaymentSelection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange} />

              }

              {currentStep === 3 &&
              <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
                    Review Your Order
                  </h2>

                  <div className="space-y-6">
                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Icon name="User" size={20} className="mr-2 text-primary" />
                        Customer Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Name</p>
                          <p className="text-foreground font-medium">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="text-foreground font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="text-foreground font-medium">{formData.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Icon name="MapPin" size={20} className="mr-2 text-primary" />
                        Delivery Address
                      </h3>
                      <p className="text-sm text-foreground">
                        {formData.addressLine1}
                        {formData.addressLine2 && `, ${formData.addressLine2}`}
                        <br />
                        {formData.city}, {formData.province} {formData.postalCode}
                        <br />
                        {formData.country.toUpperCase()}
                      </p>
                    </div>

                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Icon name="Truck" size={20} className="mr-2 text-primary" />
                        Delivery Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="text-foreground font-medium">
                            {new Date(formData.deliveryDate).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="text-foreground font-medium">{formData.deliveryTime}</p>
                        </div>
                      </div>
                      {formData.specialInstructions &&
                    <div className="mt-3">
                          <p className="text-muted-foreground text-sm">Special Instructions</p>
                          <p className="text-foreground text-sm">{formData.specialInstructions}</p>
                        </div>
                    }
                    </div>

                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
                        Payment Method
                      </h3>
                      <p className="text-sm text-foreground capitalize">
                        {formData.paymentMethod.replace('-', ' ')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Checkbox
                      label="I accept the terms and conditions"
                      description="By placing this order, you agree to our terms of service and privacy policy"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleFieldChange('termsAccepted', e.target.checked)}
                      error={errors.termsAccepted}
                      required />

                    </div>
                  </div>
                </div>
              }

              <div className="flex items-center justify-between pt-6">
                {currentStep > 0 &&
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={handleBack}>

                    Back
                  </Button>
                }

                {currentStep < steps.length - 1 ?
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleNext}
                  className={currentStep === 0 ? 'ml-auto' : ''}>

                    Continue
                  </Button> :

                <Button
                  variant="default"
                  size="lg"
                  iconName="CheckCircle2"
                  iconPosition="left"
                  onClick={handlePlaceOrder}
                  loading={isProcessing}
                  className="ml-auto">

                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                }
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummaryCard items={cartItems} summary={orderSummary} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-sm text-muted-foreground">Secure Checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={20} className="text-success" />
                <span className="text-sm text-muted-foreground">SSL Encrypted</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hera Handcrafted. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Checkout;