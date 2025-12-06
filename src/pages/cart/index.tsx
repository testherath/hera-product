import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import CartItemCard from './components/CartItemCard';
import ShippingSelector from './components/ShippingSelector';
import PromoCodeInput from './components/PromoCodeInput';
import OrderSummary from './components/OrderSummary';
import RecommendedProducts from './components/RecommendedProducts';
import EmptyCart from './components/EmptyCart';
import Icon from '../../components/AppIcon';
import { CartItem, ShippingOption, PromoCode, CartSummary, RecommendedProduct } from './types';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Handcrafted Teak Cutting Board',
    category: 'Kitchen Essentials',
    price: 8500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1530310753722-ad9195fa1024",
    alt: 'Rectangular teak wood cutting board with natural grain patterns on white marble countertop',
    woodType: 'Premium Teak',
    customization: 'Engraved "The Smith Family"',
    inStock: true,
    estimatedDelivery: '15-18 Dec 2024'
  },
  {
    id: '2',
    name: 'Carved Wooden Wall Art',
    category: 'Home Décor',
    price: 12500,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1560216020-388eb839061d",
    alt: 'Intricate carved wooden wall art panel featuring traditional Sri Lankan floral motifs',
    woodType: 'Mahogany',
    inStock: true,
    estimatedDelivery: '20-23 Dec 2024'
  },
  {
    id: '3',
    name: 'Artisan Spice Box Set',
    category: 'Kitchen Essentials',
    price: 6800,
    quantity: 1,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1183a947b-1764860393161.png",
    alt: 'Wooden spice box set with multiple compartments containing colorful spices',
    woodType: 'Rosewood',
    inStock: false,
    estimatedDelivery: '18-21 Dec 2024'
  }];


  const shippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Delivered to your doorstep with care',
    price: 0,
    estimatedDays: '5-7 business days'
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Priority handling and faster delivery',
    price: 1500,
    estimatedDays: '2-3 business days'
  },
  {
    id: 'premium',
    name: 'Premium White Glove',
    description: 'Includes unpacking and placement service',
    price: 3500,
    estimatedDays: '1-2 business days'
  }];


  const promoCodes: PromoCode[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage' },
  { code: 'CRAFT15', discount: 15, type: 'percentage' },
  { code: 'HERITAGE20', discount: 20, type: 'percentage' }];


  const recommendedProducts: RecommendedProduct[] = [
  {
    id: 'rec1',
    name: 'Wooden Serving Tray',
    price: 5500,
    image: "https://images.unsplash.com/photo-1625036428373-2bb6ca702395",
    alt: 'Rectangular wooden serving tray with handles on rustic table setting',
    category: 'Kitchen Essentials'
  },
  {
    id: 'rec2',
    name: 'Decorative Bowl Set',
    price: 7200,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f549da64-1764786777864.png",
    alt: 'Set of three nested wooden bowls with smooth finish and natural wood grain',
    category: 'Home Décor'
  },
  {
    id: 'rec3',
    name: 'Wooden Coaster Set',
    price: 2800,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4c25b97-1764892392387.png",
    alt: 'Set of six round wooden coasters with cork backing arranged in circle',
    category: 'Kitchen Essentials'
  },
  {
    id: 'rec4',
    name: 'Carved Photo Frame',
    price: 4500,
    image: "https://images.unsplash.com/photo-1718567927858-21b434721fbc",
    alt: 'Ornate carved wooden photo frame with traditional patterns on white wall',
    category: 'Home Décor'
  }];


  useEffect(() => {
    const savedCart = localStorage.getItem('heraCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems(mockCartItems);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('heraCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((items) =>
    items.map((item) =>
    item.id === id ? { ...item, quantity } : item
    )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleSaveForLater = (id: string) => {
    const savedItems = JSON.parse(localStorage.getItem('heraSavedItems') || '[]');
    const itemToSave = cartItems.find((item) => item.id === id);
    if (itemToSave) {
      savedItems.push(itemToSave);
      localStorage.setItem('heraSavedItems', JSON.stringify(savedItems));
      handleRemoveItem(id);
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    }
  };

  const handleApplyPromo = (code: string) => {
    const validPromo = promoCodes.find((p) => p.code === code);
    if (validPromo) {
      setAppliedPromo(code);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
  };

  const handleAddRecommended = (productId: string) => {
    console.log('Adding recommended product:', productId);
  };

  const calculateSummary = (): CartSummary => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = shippingOptions.find((opt) => opt.id === selectedShipping)?.price || 0;
    const tax = Math.round(subtotal * 0.15);

    let discount = 0;
    if (appliedPromo) {
      const promo = promoCodes.find((p) => p.code === appliedPromo);
      if (promo) {
        discount = promo.type === 'percentage' ?
        Math.round(subtotal * (promo.discount / 100)) :
        promo.discount;
      }
    }

    const total = subtotal + shippingCost + tax - discount;

    return { subtotal, shipping: shippingCost, tax, discount, total };
  };

  const summary = calculateSummary();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Hera Handcrafted</title>
        <meta name="description" content="Review your handcrafted wooden products and proceed to checkout. Free shipping on orders over LKR 15,000." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 lg:pt-24 pb-16">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="font-headline text-3xl lg:text-4xl font-semibold text-primary mb-2">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {cartItems.length > 0 ?
                `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart` :
                'Your cart is empty'}
              </p>
            </div>

            {showSavedMessage &&
            <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg flex items-center gap-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="text-success font-semibold">Item saved for later</p>
              </div>
            }

            {cartItems.length === 0 ?
            <EmptyCart /> :

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) =>
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onSaveForLater={handleSaveForLater} />

                )}

                  <ShippingSelector
                  options={shippingOptions}
                  selectedOption={selectedShipping}
                  onSelect={setSelectedShipping} />


                  <PromoCodeInput
                  onApply={handleApplyPromo}
                  appliedCode={appliedPromo}
                  onRemove={handleRemovePromo} />

                </div>

                <div className="lg:col-span-1">
                  <OrderSummary
                  summary={summary}
                  itemCount={totalItems} />

                </div>
              </div>
            }

            {cartItems.length > 0 &&
            <div className="mt-12">
                <RecommendedProducts
                products={recommendedProducts}
                onAddToCart={handleAddRecommended} />

              </div>
            }
          </div>
        </main>

        <footer className="bg-primary text-primary-foreground py-8 border-t border-border">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Hera Handcrafted. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-accent transition-colors">Shipping Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>);

};

export default Cart;