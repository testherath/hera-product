import { useEffect } from 'react';
import Header from '../../components/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryShowcase from './components/CategoryShowcase';
import ArtisanStories from './components/ArtisanStories';
import TestimonialsSlider from './components/TestimonialsSlider';
import BrandStory from './components/BrandStory';
import SeasonalCollections from './components/SeasonalCollections';
import SustainabilitySection from './components/SustainabilitySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import {
  HeroSlide,
  FeaturedProduct,
  ProductCategory,
  ArtisanStory,
  CustomerTestimonial,
  SeasonalCollection,
  BrandValue,
  SustainabilityMetric } from
'./types';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Handcrafted with Heritage",
    subtitle: "New Collection 2024",
    description: "Discover authentic Sri Lankan wooden masterpieces that blend traditional craftsmanship with contemporary design. Each piece tells a story of generations-old artistry.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f054d569-1764651051733.png",
    alt: "Elegant handcrafted wooden dining table with natural grain patterns in modern minimalist room with warm lighting",
    ctaText: "Explore Collection",
    ctaLink: "/shop"
  },
  {
    id: 2,
    title: "Your Story, Our Craft",
    subtitle: "Custom Creations",
    description: "Transform your vision into reality with personalized wooden pieces. From custom engravings to unique dimensions, we bring your ideas to life.",
    image: "https://images.unsplash.com/photo-1638725997667-47346a462dfa",
    alt: "Artisan carefully engraving personalized message onto smooth wooden cutting board in traditional workshop",
    ctaText: "Start Customizing",
    ctaLink: "/custom-orders"
  },
  {
    id: 3,
    title: "Sustainable Luxury",
    subtitle: "Eco-Friendly Craftsmanship",
    description: "Every purchase supports sustainable forestry and local artisan communities. Create a beautiful home while making a positive environmental impact.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9058a76-1764769426551.png",
    alt: "Collection of handcrafted wooden bowls and utensils made from sustainably sourced Sri Lankan wood on natural fiber mat",
    ctaText: "Learn Our Impact",
    ctaLink: "/shop"
  }];


  const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Artisan Cutting Board Collection",
    category: "Kitchen Essentials",
    price: 8500,
    originalPrice: 12000,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11a9325ba-1764834924772.png",
    alt: "Premium rectangular wooden cutting board with rich walnut grain and juice groove on marble countertop",
    rating: 5,
    reviews: 127,
    isNew: false,
    isBestseller: true,
    customizable: true
  },
  {
    id: 2,
    name: "Heritage Serving Tray Set",
    category: "Home Décor",
    price: 15000,
    image: "https://images.unsplash.com/photo-1686382755991-70ac3b31685a",
    alt: "Elegant oval wooden serving tray with brass handles displaying breakfast items on white linen tablecloth",
    rating: 5,
    reviews: 89,
    isNew: true,
    isBestseller: false,
    customizable: true
  },
  {
    id: 3,
    name: "Traditional Spice Box",
    category: "Kitchen Essentials",
    price: 6500,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1183a947b-1764860393161.png",
    alt: "Handcrafted wooden spice box with multiple compartments containing colorful spices on rustic kitchen counter",
    rating: 4,
    reviews: 64,
    isNew: false,
    isBestseller: false,
    customizable: false
  },
  {
    id: 4,
    name: "Decorative Wall Shelf",
    category: "Home Décor",
    price: 18000,
    originalPrice: 22000,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd2e4284-1764650558520.png",
    alt: "Modern floating wooden wall shelf with natural edge displaying potted plants and decorative items against white wall",
    rating: 5,
    reviews: 156,
    isNew: false,
    isBestseller: true,
    customizable: true
  }];


  const categories: ProductCategory[] = [
  {
    id: 1,
    name: "Kitchen Essentials",
    description: "Functional art for your culinary space, from cutting boards to utensil holders",
    image: "https://images.unsplash.com/photo-1469990283775-c1e02dc06e8a",
    alt: "Assortment of handcrafted wooden kitchen utensils and cutting boards arranged on marble countertop with fresh herbs",
    productCount: 48,
    link: "/shop"
  },
  {
    id: 2,
    name: "Home Décor",
    description: "Transform your living spaces with unique wooden accents and statement pieces",
    image: "https://images.unsplash.com/photo-1581820302673-395d3638faec",
    alt: "Stylish wooden wall art and decorative bowls displayed on minimalist shelf in contemporary living room",
    productCount: 62,
    link: "/shop"
  },
  {
    id: 3,
    name: "Custom Creations",
    description: "Personalized pieces designed specifically for your unique vision and space",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17c40b575-1764664382593.png",
    alt: "Artisan working on custom wooden furniture piece with personalized engraving in traditional workshop",
    productCount: 0,
    link: "/custom-orders"
  }];


  const artisanStories: ArtisanStory[] = [
  {
    id: 1,
    name: "Kumara Wickramasinghe",
    role: "Master Craftsman",
    experience: "35+ Years",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10980984d-1764787210232.png",
    alt: "Experienced Sri Lankan master craftsman with gray beard carefully examining wooden piece in traditional workshop",
    story: "Growing up in a family of woodworkers, I learned the art of traditional Sri Lankan carpentry from my grandfather. Each piece I create carries the wisdom of generations, combining time-honored techniques with contemporary design sensibilities. My passion lies in revealing the natural beauty hidden within each piece of wood.",
    specialization: "Traditional Furniture & Decorative Pieces"
  },
  {
    id: 2,
    name: "Nimal Perera",
    role: "Wood Carving Specialist",
    experience: "28+ Years",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19fec8b90-1764800512848.png",
    alt: "Skilled wood carving specialist with focused expression creating intricate patterns on wooden panel in workshop",
    story: "Intricate carving is my meditation. I specialize in traditional Sri Lankan motifs and patterns, bringing ancient designs into modern homes. Every curve and detail is carefully planned and executed, ensuring that each piece becomes a conversation starter and a family heirloom.",
    specialization: "Decorative Carvings & Custom Engravings"
  },
  {
    id: 3,
    name: "Chaminda Silva",
    role: "Kitchen Essentials Expert",
    experience: "22+ Years",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c19be84a-1764664382879.png",
    alt: "Kitchen essentials craftsman in blue apron smoothing wooden cutting board with sandpaper in bright workshop",
    story: "I believe that kitchen tools should be both beautiful and functional. My cutting boards and utensils are designed to last generations while making everyday cooking a pleasure. I carefully select each piece of wood for its grain pattern and durability, ensuring perfect balance in every creation.",
    specialization: "Cutting Boards & Kitchen Utensils"
  }];


  const testimonials: CustomerTestimonial[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    location: "Colombo, Sri Lanka",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0007e95-1763295050768.png",
    alt: "Professional woman with brown hair and warm smile wearing blue blouse in bright office setting",
    rating: 5,
    review: "The custom cutting board I ordered exceeded all expectations. The craftsmanship is exceptional, and the personalized engraving made it a perfect anniversary gift. You can feel the quality and care in every detail. This is truly an heirloom piece.",
    productPurchased: "Custom Engraved Cutting Board",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Kandy, Sri Lanka",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10ddd37f7-1763301351016.png",
    alt: "Asian businessman in gray suit with glasses smiling confidently in modern corporate office",
    rating: 5,
    review: "I've purchased several pieces from Hera, and each one is a work of art. The serving tray set has become the centerpiece of our dinner parties. Guests always ask where we got it. The quality is outstanding, and knowing it supports local artisans makes it even more special.",
    productPurchased: "Heritage Serving Tray Set",
    date: "2024-02-03"
  },
  {
    id: 3,
    name: "Priya Jayawardena",
    location: "Galle, Sri Lanka",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf3907dc-1764749519318.png",
    alt: "South Asian woman with long dark hair wearing traditional jewelry and elegant saree smiling warmly",
    rating: 5,
    review: "As an interior designer, I'm always looking for unique pieces for my clients. Hera's collection never disappoints. The attention to detail and the sustainable practices make them my go-to source for wooden décor. The wall shelf I ordered transformed my client's living room.",
    productPurchased: "Decorative Wall Shelf",
    date: "2024-01-28"
  },
  {
    id: 4,
    name: "David Wilson",
    location: "Negombo, Sri Lanka",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16ddbae3e-1763296852165.png",
    alt: "Young professional man with short brown hair in casual blue shirt smiling in contemporary workspace",
    rating: 5,
    review: "The spice box is not just functional—it's a beautiful addition to my kitchen. The craftsmanship is evident in every joint and finish. I appreciate the sustainable sourcing and the story behind each piece. This is what conscious consumerism looks like.",
    productPurchased: "Traditional Spice Box",
    date: "2024-02-10"
  }];


  const seasonalCollections: SeasonalCollection[] = [
  {
    id: 1,
    title: "Vesak Festival Collection",
    description: "Celebrate the Festival of Lights with our special collection featuring traditional Sri Lankan designs and motifs. Each piece incorporates symbolic elements that honor this sacred occasion while serving as functional art for your home.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13765a46f-1764930314422.png",
    alt: "Collection of ornate wooden lanterns and decorative pieces with traditional Sri Lankan Vesak festival motifs on display",
    products: 24,
    link: "/shop",
    startDate: "2024-05-01",
    endDate: "2024-05-31"
  },
  {
    id: 2,
    title: "Monsoon Comfort Collection",
    description: "Warm, cozy pieces perfect for the rainy season. From serving trays for indoor gatherings to decorative items that bring warmth to your space during the monsoon months.",
    image: "https://images.unsplash.com/photo-1695559000352-24e66f085c7b",
    alt: "Cozy wooden serving tray with hot beverages and comfort items arranged on soft blanket by rainy window",
    products: 18,
    link: "/shop",
    startDate: "2024-06-01",
    endDate: "2024-08-31"
  }];


  const brandValues: BrandValue[] = [
  {
    id: 1,
    icon: "Leaf",
    title: "Sustainable Sourcing",
    description: "100% sustainably harvested Sri Lankan wood"
  },
  {
    id: 2,
    icon: "Users",
    title: "Artisan Support",
    description: "Fair wages and skill development programs"
  },
  {
    id: 3,
    icon: "Heart",
    title: "Handcrafted Quality",
    description: "Every piece individually crafted with care"
  },
  {
    id: 4,
    icon: "Shield",
    title: "Lifetime Guarantee",
    description: "Quality assurance on all our products"
  }];


  const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: 1,
    value: "10,000+",
    label: "Trees Planted",
    description: "Through our reforestation program",
    icon: "TreePine"
  },
  {
    id: 2,
    value: "100%",
    label: "Carbon Neutral",
    description: "All operations and shipping",
    icon: "Leaf"
  },
  {
    id: 3,
    value: "250+",
    label: "Artisans Supported",
    description: "Fair trade certified partnerships",
    icon: "Users"
  },
  {
    id: 4,
    value: "Zero",
    label: "Waste Production",
    description: "Complete wood utilization",
    icon: "Recycle"
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        <HeroSection slides={heroSlides} />
        <FeaturedProducts products={featuredProducts} />
        <CategoryShowcase categories={categories} />
        <BrandStory values={brandValues} />
        <ArtisanStories stories={artisanStories} />
        <SeasonalCollections collections={seasonalCollections} />
        <TestimonialsSlider testimonials={testimonials} />
        <SustainabilitySection metrics={sustainabilityMetrics} />
        <CTASection />
      </main>
      <Footer />
    </div>);

};

export default Homepage;