import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import CustomizationPanel from './components/CustomizationPanel';
import ProductSpecifications from './components/ProductSpecifications';
import ArtisanStory from './components/ArtisanStory';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import {
  Product,
  WoodType,
  ProductSize,
  EngravingOption,
  CustomizationState,
  RelatedProduct
} from
  './types';

const ProductDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'care'>('details');
  const [customization, setCustomization] = useState<CustomizationState>({
    woodType: 'teak',
    size: 'medium',
    engraving: {
      enabled: false,
      type: 'text',
      text: ''
    },
    quantity: 1
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [dbProduct, setDbProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?id=${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setDbProduct(data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !dbProduct) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  // Map DB product to UI Product interface
  const productDisplay: Product = {
    id: dbProduct.id.toString(), // Ensure string ID
    name: dbProduct.name,
    category: dbProduct.category,
    basePrice: dbProduct.price,
    description: dbProduct.description,
    longDescription: dbProduct.description, // Use same description for now if long one missing
    images: Array.isArray(dbProduct.images) ? dbProduct.images : [],
    specifications: {
      material: dbProduct.woodType || 'Premium Wood',
      finish: 'Natural Oil',
      care: 'Hand wash only',
      origin: 'Sri Lanka'
    },
    artisan: typeof dbProduct.artisan === 'string' ? {
      id: '1',
      name: dbProduct.artisan,
      avatar: '/placeholder-avatar.jpg',
      avatarAlt: dbProduct.artisan,
      experience: 'Expert Artisan',
      specialization: dbProduct.category,
      bio: 'Master artisan dedicated to traditional craftsmanship.',
      signature: 'Handcrafted'
    } : dbProduct.artisan,
    reviews: dbProduct.reviews > 0 ? [] : [ // If no review data in DB yet, show placeholder or empty
      {
        id: '1',
        customerName: 'Verified Buyer',
        avatar: '',
        avatarAlt: 'User',
        rating: 5,
        date: 'Recent',
        comment: 'Excellent craftsmanship!',
        productImage: dbProduct.images?.[0]?.url || '',
        productImageAlt: dbProduct.name,
        verified: true
      }
    ],
    rating: dbProduct.rating || 5,
    reviewCount: dbProduct.reviews || 0,
    inStock: dbProduct.inStock,
    sustainabilityCertified: true
  };

  const woodTypes: WoodType[] = [
    {
      id: 'teak',
      name: 'Teak Wood',
      description: 'Premium hardwood known for durability and natural oils that resist moisture',
      priceMultiplier: 1.0,
      image: "https://images.unsplash.com/photo-1589221128736-ed673ed1532f",
      alt: 'Close-up texture of teak wood showing golden brown color and distinctive grain pattern',
      properties: ['Water-resistant', 'Durable', 'Natural oils']
    },
    {
      id: 'mahogany',
      name: 'Mahogany',
      description: 'Rich reddish-brown wood with fine grain, perfect for elegant presentations',
      priceMultiplier: 1.2,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9f3203a-1764800510814.png",
      alt: 'Mahogany wood surface showing deep reddish-brown color with smooth fine grain texture',
      properties: ['Rich color', 'Fine grain', 'Premium finish']
    },
    {
      id: 'ebony',
      name: 'Ebony Wood',
      description: 'Rare dark wood with exceptional hardness and luxurious appearance',
      priceMultiplier: 1.5,
      image: "https://images.unsplash.com/photo-1703113692107-84443a447d8e",
      alt: 'Dark ebony wood texture showing deep black color with subtle grain patterns',
      properties: ['Rare', 'Extremely hard', 'Luxury']
    },
    {
      id: 'coconut',
      name: 'Coconut Wood',
      description: 'Sustainable eco-friendly option with unique patterns and warm tones',
      priceMultiplier: 0.8,
      image: "https://images.unsplash.com/photo-1706719684102-d8e33cc7d301",
      alt: 'Coconut wood surface with distinctive patterns and warm brown tones showing natural texture',
      properties: ['Eco-friendly', 'Unique patterns', 'Sustainable']
    }];


  const sizes: ProductSize[] = [
    { id: 'small', name: 'Small', dimensions: '30cm × 20cm', priceAdjustment: 0 },
    { id: 'medium', name: 'Medium', dimensions: '40cm × 30cm', priceAdjustment: 2500 },
    { id: 'large', name: 'Large', dimensions: '50cm × 35cm', priceAdjustment: 5000 },
    { id: 'xlarge', name: 'Extra Large', dimensions: '60cm × 40cm', priceAdjustment: 7500 }];


  const engravingOptions: EngravingOption[] = [
    { id: 'text', type: 'text', name: 'Custom Text', price: 1500, maxCharacters: 30 },
    { id: 'design', type: 'design', name: 'Custom Design', price: 3000 }];


  const relatedProducts: RelatedProduct[] = [
    {
      id: 'rel-1',
      name: 'Wooden Salad Bowl Set',
      price: 8500,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f549da64-1764786777864.png",
      alt: 'Set of three wooden salad bowls in different sizes with natural wood finish on white background',
      category: 'Kitchen Essentials',
      rating: 4.7
    },
    {
      id: 'rel-2',
      name: 'Carved Spice Box',
      price: 6500,
      image: "https://images.unsplash.com/photo-1605799334607-8eb7b4e13858",
      alt: 'Traditional carved wooden spice box with multiple compartments and decorative lid',
      category: 'Kitchen Essentials',
      rating: 4.9
    },
    {
      id: 'rel-3',
      name: 'Wooden Utensil Set',
      price: 4500,
      image: "https://images.unsplash.com/photo-1730597363352-0a8fe6eb5d12",
      alt: 'Set of handcrafted wooden cooking utensils including spoons and spatulas in ceramic holder',
      category: 'Kitchen Essentials',
      rating: 4.6
    },
    {
      id: 'rel-4',
      name: 'Decorative Wall Panel',
      price: 15000,
      image: "https://images.unsplash.com/photo-1711213323667-7fb02c8b75a1",
      alt: 'Intricately carved wooden wall panel with traditional Sri Lankan motifs and patterns',
      category: 'Home Décor',
      rating: 4.8
    }];


  const calculatePrice = (): number => {
    const selectedWood = woodTypes.find((w) => w.id === customization.woodType);
    const selectedSize = sizes.find((s) => s.id === customization.size);
    const engravingPrice = customization.engraving.enabled ? 1500 : 0;

    const woodMultiplier = selectedWood?.priceMultiplier || 1;
    const sizeAdjustment = selectedSize?.priceAdjustment || 0;

    return (productDisplay.basePrice * woodMultiplier + sizeAdjustment + engravingPrice) * customization.quantity;
  };

  const handleAddToCart = () => {
    navigate('/cart');
  };

  const tabs = [
    { id: 'details', label: 'Details & Specifications', icon: 'FileText' },
    { id: 'reviews', label: 'Customer Reviews', icon: 'MessageSquare' },
    { id: 'care', label: 'Care Instructions', icon: 'Heart' }];


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300">

              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm font-medium">Back to Shop</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ImageGallery images={productDisplay.images} productName={productDisplay.name} />

            <div className="space-y-6">
              <ProductInfo
                product={productDisplay}
                currentPrice={calculatePrice()}
                onAddToCart={handleAddToCart} />

              <CustomizationPanel
                woodTypes={woodTypes}
                sizes={sizes}
                engravingOptions={engravingOptions}
                customization={customization}
                onCustomizationChange={setCustomization} />

            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6 border-b border-border overflow-x-auto">
              {tabs.map((tab) =>
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors duration-300 border-b-2 whitespace-nowrap ${activeTab === tab.id ?
                    'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary'}`
                  }>

                  <Icon name={tab.icon} size={18} />
                  {tab.label}
                </button>
              )}
            </div>

            {activeTab === 'details' && <ProductSpecifications product={productDisplay} />}

            {activeTab === 'reviews' &&
              <CustomerReviews
                reviews={productDisplay.reviews}
                averageRating={productDisplay.rating}
                totalReviews={productDisplay.reviewCount} />

            }

            {/* Care instructions hardcoded for now or use productDisplay if available */}
            {activeTab === 'care' &&
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-xl font-headline font-semibold text-primary mb-4 flex items-center gap-2">
                    <Icon name="Droplet" size={20} />
                    Care Instructions
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Hand" size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-medium text-primary mb-1">Hand Wash Only</p>
                        <p className="text-sm text-muted-foreground">
                          Clean with warm water and mild soap. Avoid dishwashers and prolonged soaking.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Droplets" size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-medium text-primary mb-1">Monthly Oiling</p>
                        <p className="text-sm text-muted-foreground">
                          Apply food-safe mineral oil monthly to maintain the wood's natural beauty and prevent drying.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Sun" size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-medium text-primary mb-1">Avoid Direct Sunlight</p>
                        <p className="text-sm text-muted-foreground">
                          Store in a cool, dry place away from direct sunlight to prevent warping or cracking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                  <h3 className="text-lg font-headline font-semibold text-primary mb-3 flex items-center gap-2">
                    <Icon name="LifeBuoy" size={20} />
                    Lifetime Support
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We offer free restoration services for all our products. If your piece needs refinishing or repair, contact our artisan support team.
                  </p>
                  <Button variant="outline" iconName="Mail" iconPosition="left">
                    Contact Support
                  </Button>
                </div>
              </div>
            }
          </div>

          <ArtisanStory artisan={productDisplay.artisan} />

          <div className="mt-12">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Hérā Products. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default ProductDetails;