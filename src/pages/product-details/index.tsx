import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  RelatedProduct } from
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

  const product: Product = {
    id: 'prod-001',
    name: 'Handcrafted Teak Serving Board',
    category: 'Kitchen Essentials',
    basePrice: 12500,
    description:
    'Exquisite handcrafted serving board made from premium Sri Lankan teak wood. Perfect for entertaining guests with its natural beauty and durability.',
    longDescription: `This stunning serving board represents the pinnacle of Sri Lankan woodworking craftsmanship. Each piece is carefully selected from sustainably harvested teak forests and hand-finished by master artisans with over 20 years of experience.\n\nThe natural grain patterns make every board unique, while the smooth finish ensures easy cleaning and maintenance. The board features a convenient juice groove to catch liquids and prevent spills, making it ideal for serving cheeses, charcuterie, fruits, or as an elegant centerpiece.\n\nOur artisans use traditional techniques passed down through generations, combined with modern finishing methods to create a product that will last for decades. The teak wood's natural oils provide inherent resistance to moisture and bacteria, making it a hygienic choice for food preparation and serving.`,
    images: [
    {
      id: 'img-1',
      url: "https://images.unsplash.com/photo-1647345408743-9363d98c6518",
      alt: 'Handcrafted teak serving board with natural wood grain patterns on white marble surface',
      type: 'main'
    },
    {
      id: 'img-2',
      url: "https://images.unsplash.com/photo-1688240806337-7f7e8ba02b49",
      alt: 'Close-up detail of teak wood grain texture showing rich brown tones and natural patterns',
      type: 'detail'
    },
    {
      id: 'img-3',
      url: "https://images.unsplash.com/photo-1714670154452-5fc03ab1d08e",
      alt: 'Teak serving board styled with fresh fruits and cheese on rustic wooden table',
      type: 'main'
    },
    {
      id: 'img-4',
      url: "https://images.unsplash.com/photo-1613108875513-00c6e6cf1e58",
      alt: 'Side view of teak serving board showing thickness and smooth edges with natural finish',
      type: '360'
    }],

    specifications: {
      material: 'Premium Sri Lankan Teak Wood',
      finish: 'Food-safe mineral oil & beeswax',
      care: 'Hand wash only, oil monthly',
      origin: 'Handcrafted in Kandy, Sri Lanka'
    },
    artisan: {
      id: 'artisan-001',
      name: 'Sunil Perera',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cef99b40-1764742237259.png",
      avatarAlt: 'Portrait of Sunil Perera, master woodworker in traditional Sri Lankan attire smiling at camera',
      experience: '25+ years of woodworking',
      specialization: 'Traditional Sri Lankan wood carving and finishing',
      bio: 'Sunil learned the art of woodworking from his grandfather in the hills of Kandy. His passion for preserving traditional techniques while embracing sustainable practices has made him one of the most respected artisans in Sri Lanka.',
      signature: 'Hand-carved details with traditional chisel techniques'
    },
    reviews: [
    {
      id: 'rev-1',
      customerName: 'Sarah Mitchell',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14b2d756c-1763300076170.png",
      avatarAlt: 'Professional headshot of Sarah Mitchell, woman with brown hair in business casual attire',
      rating: 5,
      date: 'December 15, 2024',
      comment:
      'Absolutely stunning craftsmanship! The wood grain is beautiful and the finish is perfect. I use it daily for serving breakfast and it still looks brand new after 6 months.',
      productImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fee3c94e-1764930314085.png",
      productImageAlt: 'Teak serving board in customer home with breakfast items arranged on kitchen counter',
      verified: true
    },
    {
      id: 'rev-2',
      customerName: 'James Anderson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_180a47b0b-1764766556477.png",
      avatarAlt: 'Casual photo of James Anderson, man with glasses and beard smiling outdoors',
      rating: 5,
      date: 'December 10, 2024',
      comment:
      'Bought this as a wedding gift and the couple absolutely loved it! The personalized engraving was beautifully done. Highly recommend for special occasions.',
      productImage: "https://images.unsplash.com/photo-1557418296-209aa88c3210",
      productImageAlt: 'Engraved teak serving board with custom text displayed on dining table with wine glasses',
      verified: true
    },
    {
      id: 'rev-3',
      customerName: 'Emily Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18ad53fcd-1764674936084.png",
      avatarAlt: 'Portrait of Emily Chen, Asian woman with long black hair in elegant dress',
      rating: 4,
      date: 'December 5, 2024',
      comment:
      'Beautiful board with excellent quality. The only reason for 4 stars instead of 5 is that it took a bit longer to arrive than expected, but the wait was worth it!',
      productImage: "https://images.unsplash.com/photo-1693031310895-cdc78cf15855",
      productImageAlt: 'Teak serving board with charcuterie arrangement in modern kitchen setting',
      verified: true
    }],

    rating: 4.8,
    reviewCount: 60,
    inStock: true,
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

    return (product.basePrice * woodMultiplier + sizeAdjustment + engravingPrice) * customization.quantity;
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
            <ImageGallery images={product.images} productName={product.name} />

            <div className="space-y-6">
              <ProductInfo
                product={product}
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
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors duration-300 border-b-2 whitespace-nowrap ${
                activeTab === tab.id ?
                'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary'}`
                }>

                  <Icon name={tab.icon} size={18} />
                  {tab.label}
                </button>
              )}
            </div>

            {activeTab === 'details' && <ProductSpecifications product={product} />}

            {activeTab === 'reviews' &&
            <CustomerReviews
              reviews={product.reviews}
              averageRating={product.rating}
              totalReviews={product.reviewCount} />

            }

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

          <ArtisanStory artisan={product.artisan} />

          <div className="mt-12">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Hera Handcrafted. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default ProductDetails;