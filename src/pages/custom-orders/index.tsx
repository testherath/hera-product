import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import StepIndicator from './components/StepIndicator';
import CategorySelector from './components/CategorySelector';
import WoodSelector from './components/WoodSelector';
import DimensionControls from './components/DimensionControls';
import EngravingCustomizer from './components/EngravingCustomizer';
import ImageUploader from './components/ImageUploader';
import PriceCalculator from './components/PriceCalculator';
import OrderSummary from './components/OrderSummary';
import {
  CustomOrderFormData,
  ProductCategory,
  WoodType,
  EngravingFont,
  OrderStep,
  PriceBreakdown } from
'./types';

const CustomOrders: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps: OrderStep[] = [
  { id: 1, title: 'Category', description: 'Choose product type', completed: false },
  { id: 2, title: 'Wood', description: 'Select wood type', completed: false },
  { id: 3, title: 'Dimensions', description: 'Set size', completed: false },
  { id: 4, title: 'Engraving', description: 'Personalize', completed: false },
  { id: 5, title: 'Details', description: 'Final touches', completed: false },
  { id: 6, title: 'Review', description: 'Confirm order', completed: false }];


  const [formData, setFormData] = useState<CustomOrderFormData>({
    category: '',
    woodType: '',
    dimensions: { length: 12, width: 8, height: 1 },
    engraving: { enabled: false, text: '', font: '', position: 'center' },
    referenceImages: [],
    specialInstructions: '',
    quantity: 1
  });

  const categories: ProductCategory[] = [
  {
    id: 'cutting-board',
    name: 'Cutting Board',
    basePrice: 3500,
    description: 'Durable kitchen essential',
    image: "https://images.unsplash.com/photo-1530310753722-ad9195fa1024",
    alt: 'Handcrafted wooden cutting board with natural grain pattern on marble countertop'
  },
  {
    id: 'serving-tray',
    name: 'Serving Tray',
    basePrice: 4200,
    description: 'Elegant entertaining piece',
    image: "https://images.unsplash.com/photo-1668556102531-2521a0de30e4",
    alt: 'Rustic wooden serving tray with handles displaying breakfast items and coffee'
  },
  {
    id: 'wall-art',
    name: 'Wall Art',
    basePrice: 5800,
    description: 'Decorative statement piece',
    image: "https://images.unsplash.com/photo-1560017691-525a772f35b1",
    alt: 'Modern geometric wooden wall art with natural wood tones in contemporary living room'
  },
  {
    id: 'jewelry-box',
    name: 'Jewelry Box',
    basePrice: 6500,
    description: 'Elegant storage solution',
    image: "https://images.unsplash.com/photo-1650019528148-3377a7ac1e55",
    alt: 'Handcrafted wooden jewelry box with intricate carved details and velvet interior'
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    basePrice: 12000,
    description: 'Custom storage unit',
    image: "https://images.unsplash.com/photo-1702426900084-d7b47ae2433c",
    alt: 'Minimalist wooden bookshelf with clean lines displaying books and decorative items'
  },
  {
    id: 'dining-table',
    name: 'Dining Table',
    basePrice: 45000,
    description: 'Centerpiece furniture',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f054d569-1764651051733.png",
    alt: 'Solid wood dining table with natural edge and modern metal legs in bright dining room'
  }];


  const woodTypes: WoodType[] = [
  {
    id: 'teak',
    name: 'Teak Wood',
    description: 'Premium hardwood known for exceptional durability and natural oils',
    pricePerSqFt: 450,
    texture: 'Straight grain',
    color: 'Golden brown',
    durability: 'Excellent',
    image: "https://images.unsplash.com/photo-1589221128736-ed673ed1532f",
    alt: 'Close-up of teak wood grain showing rich golden brown color and straight grain pattern'
  },
  {
    id: 'mahogany',
    name: 'Mahogany',
    description: 'Rich reddish-brown wood with fine grain and excellent workability',
    pricePerSqFt: 380,
    texture: 'Fine grain',
    color: 'Reddish brown',
    durability: 'Very good',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9f3203a-1764800510814.png",
    alt: 'Polished mahogany wood surface displaying deep reddish-brown color and fine grain texture'
  },
  {
    id: 'ebony',
    name: 'Ebony Wood',
    description: 'Rare dark wood prized for its density and striking appearance',
    pricePerSqFt: 650,
    texture: 'Very fine',
    color: 'Deep black',
    durability: 'Outstanding',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_142cbb22d-1764793773118.png",
    alt: 'Luxurious ebony wood showing deep black color with subtle grain and smooth finish'
  },
  {
    id: 'jak',
    name: 'Jak Wood',
    description: 'Local hardwood with beautiful golden hue and termite resistance',
    pricePerSqFt: 320,
    texture: 'Medium grain',
    color: 'Golden yellow',
    durability: 'Good',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4b89422-1764695291060.png",
    alt: 'Jak wood plank showing warm golden yellow color with medium grain pattern'
  }];


  const fonts: EngravingFont[] = [
  { id: 'serif', name: 'Classic Serif', preview: 'Georgia', price: 500 },
  { id: 'script', name: 'Elegant Script', preview: 'Brush Script MT', price: 750 },
  { id: 'modern', name: 'Modern Sans', preview: 'Arial', price: 500 },
  { id: 'vintage', name: 'Vintage Typewriter', preview: 'Courier New', price: 650 }];


  const calculatePrice = (): PriceBreakdown => {
    const category = categories.find((c) => c.id === formData.category);
    const wood = woodTypes.find((w) => w.id === formData.woodType);
    const font = fonts.find((f) => f.id === formData.engraving.font);

    const basePrice = category?.basePrice || 0;
    const area = formData.dimensions.length * formData.dimensions.width / 144;
    const woodCost = wood ? wood.pricePerSqFt * area : 0;
    const engravingCost = formData.engraving.enabled ? font?.price || 500 : 0;
    const dimensionCost = area > 2 ? (area - 2) * 200 : 0;

    const subtotal = (basePrice + woodCost + engravingCost + dimensionCost) * formData.quantity;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return { basePrice, woodCost, engravingCost, dimensionCost, subtotal, tax, total };
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      navigate('/shop');
    }, 3000);
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0:
        return formData.category !== '';
      case 1:
        return formData.woodType !== '';
      case 2:
        return true;
      case 3:
        return !formData.engraving.enabled || formData.engraving.text.length > 0;
      case 4:
        return formData.quantity > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-4">
              Create Your Custom Piece
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design a unique handcrafted wooden product tailored to your exact specifications.
              Our master artisans will bring your vision to life.
            </p>
          </div>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {currentStep === 0 &&
              <div>
                  <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
                    Select Product Category
                  </h2>
                  <CategorySelector
                  categories={categories}
                  selectedCategory={formData.category}
                  onSelect={(id) => setFormData({ ...formData, category: id })} />

                </div>
              }

              {currentStep === 1 &&
              <div>
                  <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
                    Choose Wood Type
                  </h2>
                  <WoodSelector
                  woodTypes={woodTypes}
                  selectedWood={formData.woodType}
                  onSelect={(id) => setFormData({ ...formData, woodType: id })} />

                </div>
              }

              {currentStep === 2 &&
              <div>
                  <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
                    Customize Dimensions
                  </h2>
                  <DimensionControls
                  dimensions={formData.dimensions}
                  onChange={(dimension, value) =>
                  setFormData({
                    ...formData,
                    dimensions: { ...formData.dimensions, [dimension]: value }
                  })
                  } />

                </div>
              }

              {currentStep === 3 &&
              <div>
                  <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
                    Add Personalization
                  </h2>
                  <EngravingCustomizer
                  enabled={formData.engraving.enabled}
                  text={formData.engraving.text}
                  font={formData.engraving.font}
                  position={formData.engraving.position}
                  fonts={fonts}
                  onEnabledChange={(enabled) =>
                  setFormData({
                    ...formData,
                    engraving: { ...formData.engraving, enabled }
                  })
                  }
                  onTextChange={(text) =>
                  setFormData({
                    ...formData,
                    engraving: { ...formData.engraving, text }
                  })
                  }
                  onFontChange={(font) =>
                  setFormData({
                    ...formData,
                    engraving: { ...formData.engraving, font }
                  })
                  }
                  onPositionChange={(position) =>
                  setFormData({
                    ...formData,
                    engraving: { ...formData.engraving, position }
                  })
                  } />

                </div>
              }

              {currentStep === 4 &&
              <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
                      Additional Details
                    </h2>
                    <ImageUploader
                    images={formData.referenceImages}
                    onImagesChange={(images) =>
                    setFormData({ ...formData, referenceImages: images })
                    } />

                  </div>

                  <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                    <h3 className="text-xl font-headline font-semibold text-primary mb-4">
                      Special Instructions
                    </h3>
                    <textarea
                    value={formData.specialInstructions}
                    onChange={(e) =>
                    setFormData({ ...formData, specialInstructions: e.target.value })
                    }
                    placeholder="Share any specific requirements, design preferences, or special requests..."
                    className="w-full h-32 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    maxLength={500} />

                    <p className="text-sm text-muted-foreground mt-2">
                      {formData.specialInstructions.length}/500 characters
                    </p>
                  </div>

                  <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                    <Input
                    label="Quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                    setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })
                    }
                    min={1}
                    max={10}
                    description="Maximum 10 units per order" />

                  </div>
                </div>
              }

              {currentStep === 5 &&
              <div>
                  <h2 className="text-2xl font-headline font-semibold text-primary mb-6">
                    Review Your Order
                  </h2>
                  <OrderSummary
                  formData={formData}
                  category={categories.find((c) => c.id === formData.category)}
                  woodType={woodTypes.find((w) => w.id === formData.woodType)}
                  font={fonts.find((f) => f.id === formData.engraving.font)}
                  summary={calculatePrice()}
                  itemCount={formData.quantity}
                  onEdit={(step) => setCurrentStep(step)}
                  onSubmit={handleSubmit} />

                </div>
              }

              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  iconName="ChevronLeft"
                  iconPosition="left">

                  Previous
                </Button>

                {currentStep < steps.length - 1 ?
                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  iconName="ChevronRight"
                  iconPosition="right">

                    Next Step
                  </Button> :
                null}
              </div>
            </div>

            <div className="lg:col-span-1">
              <PriceCalculator breakdown={calculatePrice()} />
            </div>
          </div>
        </div>
      </main>

      {showSuccessModal &&
      <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={32} color="var(--color-success-foreground)" />
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-3">
                Order Submitted Successfully!
              </h3>
              <p className="text-muted-foreground mb-6">
                Thank you for your custom order. Our artisan team will review your specifications
                and contact you within 24 hours to confirm details and timeline.
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Icon name="Clock" size={16} className="mr-2" />
                <span>Redirecting to shop...</span>
              </div>
            </div>
          </div>
        </div>
      }

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Hera Handcrafted. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default CustomOrders;