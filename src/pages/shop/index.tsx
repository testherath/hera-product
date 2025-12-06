import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import FilterSidebar from './components/FilterSidebar';
import CategoryTiles from './components/CategoryTiles';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import SearchBar from './components/SearchBar';
import { Product, FilterOptions, SortOption, CategoryTile } from './types';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const productsPerPage = 12;

  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    woodTypes: [],
    priceRange: { min: 0, max: 100000 },
    customizable: null,
    inStock: null,
    artisans: []
  });

  const [sortBy, setSortBy] = useState('featured');

  const sortOptions: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }];


  const categoryTiles: CategoryTile[] = [
  {
    id: '1',
    name: 'Kitchen Essentials',
    image: "https://images.unsplash.com/photo-1643005619403-ebad7dfdee45",
    alt: 'Handcrafted wooden cutting boards and kitchen utensils arranged on rustic wooden table',
    count: 45,
    path: '/shop?category=kitchen'
  },
  {
    id: '2',
    name: 'Home Décor',
    image: "https://images.unsplash.com/photo-1581820302673-395d3638faec",
    alt: 'Elegant wooden decorative bowls and sculptures displayed on modern shelf',
    count: 38,
    path: '/shop?category=home-decor'
  },
  {
    id: '3',
    name: 'Custom Creations',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_119ced20e-1764654531912.png",
    alt: 'Artisan crafting personalized wooden piece with engraving tools in workshop',
    count: 52,
    path: '/shop?category=custom'
  }];


  const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Teak Cutting Board',
    category: 'kitchen',
    price: 8500,
    originalPrice: 10000,
    discount: 15,
    image: "https://images.unsplash.com/photo-1590474832266-60a7e39cbc89",
    alt: 'Large rectangular teak cutting board with natural wood grain and juice groove',
    images: [
    { url: "https://images.unsplash.com/photo-1590474832266-60a7e39cbc89", alt: 'Large rectangular teak cutting board with natural wood grain and juice groove' },
    { url: "https://images.unsplash.com/photo-1590474832266-60a7e39cbc89", alt: 'Close-up view of teak cutting board showing detailed wood texture and craftsmanship' }],

    woodType: 'Teak',
    artisan: 'Sunil Perera',
    rating: 4.8,
    reviews: 124,
    customizable: true,
    inStock: true,
    featured: true,
    description: 'Premium teak cutting board with natural antimicrobial properties. Features juice groove and ergonomic handles for easy handling.',
    dimensions: '45cm x 30cm x 2.5cm',
    tags: ['kitchen', 'cutting-board', 'teak']
  },
  {
    id: '2',
    name: 'Mahogany Serving Tray',
    category: 'home-decor',
    price: 12000,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14d53569f-1764930312997.png",
    alt: 'Elegant mahogany serving tray with brass handles on marble countertop',
    images: [
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_14d53569f-1764930312997.png", alt: 'Elegant mahogany serving tray with brass handles on marble countertop' },
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1d019cc30-1764930312594.png", alt: 'Side view of mahogany serving tray showing depth and handle detail' }],

    woodType: 'Mahogany',
    artisan: 'Nimal Fernando',
    rating: 4.9,
    reviews: 89,
    customizable: true,
    inStock: true,
    featured: true,
    description: 'Luxurious mahogany serving tray with brass handles. Perfect for entertaining guests with style and elegance.',
    dimensions: '50cm x 35cm x 5cm',
    tags: ['home-decor', 'serving-tray', 'mahogany']
  },
  {
    id: '3',
    name: 'Ebony Decorative Bowl',
    category: 'home-decor',
    price: 15000,
    originalPrice: 18000,
    discount: 17,
    image: "https://images.unsplash.com/photo-1695202263041-d54f27f09497",
    alt: 'Smooth polished ebony decorative bowl with natural dark wood finish',
    images: [
    { url: "https://images.unsplash.com/photo-1695202263041-d54f27f09497", alt: 'Smooth polished ebony decorative bowl with natural dark wood finish' },
    { url: "https://images.unsplash.com/photo-1587720090937-b76b37945b20", alt: 'Top view of ebony bowl showing circular grain pattern' }],

    woodType: 'Ebony',
    artisan: 'Chaminda Silva',
    rating: 5.0,
    reviews: 67,
    customizable: false,
    inStock: true,
    featured: false,
    description: 'Exquisite ebony bowl with smooth finish. A statement piece that adds sophistication to any space.',
    dimensions: '30cm diameter x 12cm height',
    tags: ['home-decor', 'bowl', 'ebony']
  },
  {
    id: '4',
    name: 'Rosewood Spice Rack',
    category: 'kitchen',
    price: 9500,
    image: "https://images.unsplash.com/photo-1597415950777-559f8a6e9a29",
    alt: 'Wall-mounted rosewood spice rack with multiple compartments and glass jars',
    images: [
    { url: "https://images.unsplash.com/photo-1597415950777-559f8a6e9a29", alt: 'Wall-mounted rosewood spice rack with multiple compartments and glass jars' },
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1183a947b-1764860393161.png", alt: 'Close-up of rosewood spice rack showing individual compartment detail' }],

    woodType: 'Rosewood',
    artisan: 'Pradeep Kumar',
    rating: 4.7,
    reviews: 156,
    customizable: true,
    inStock: true,
    featured: false,
    description: 'Elegant rosewood spice rack with multiple compartments. Keeps your spices organized and easily accessible.',
    dimensions: '60cm x 15cm x 8cm',
    tags: ['kitchen', 'spice-rack', 'rosewood']
  },
  {
    id: '5',
    name: 'Coconut Wood Salad Bowl Set',
    category: 'kitchen',
    price: 7500,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f549da64-1764786777864.png",
    alt: 'Set of three coconut wood salad bowls in varying sizes with natural finish',
    images: [
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f549da64-1764786777864.png", alt: 'Set of three coconut wood salad bowls in varying sizes with natural finish' },
    { url: "https://images.unsplash.com/photo-1564839741553-3a9d13ec12ed", alt: 'Stacked coconut wood bowls showing size variation' }],

    woodType: 'Coconut Wood',
    artisan: 'Ranjith Bandara',
    rating: 4.6,
    reviews: 98,
    customizable: false,
    inStock: true,
    featured: false,
    description: 'Sustainable coconut wood bowl set. Lightweight yet durable, perfect for everyday use.',
    dimensions: 'Large: 25cm, Medium: 20cm, Small: 15cm',
    tags: ['kitchen', 'bowl-set', 'coconut-wood']
  },
  {
    id: '6',
    name: 'Jak Wood Wall Art',
    category: 'home-decor',
    price: 18000,
    image: "https://images.unsplash.com/photo-1636567204606-bf807f2094ef",
    alt: 'Abstract jak wood wall art piece with geometric patterns and natural wood tones',
    images: [
    { url: "https://images.unsplash.com/photo-1636567204606-bf807f2094ef", alt: 'Abstract jak wood wall art piece with geometric patterns and natural wood tones' },
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_16bb4ea30-1764859879492.png", alt: 'Side angle view of jak wood wall art showing depth and texture' }],

    woodType: 'Jak Wood',
    artisan: 'Sunil Perera',
    rating: 4.9,
    reviews: 45,
    customizable: true,
    inStock: true,
    featured: true,
    description: 'Unique jak wood wall art with intricate patterns. A conversation starter that brings natural beauty to your walls.',
    dimensions: '80cm x 60cm x 3cm',
    tags: ['home-decor', 'wall-art', 'jak-wood']
  },
  {
    id: '7',
    name: 'Teak Cheese Board',
    category: 'kitchen',
    price: 6500,
    originalPrice: 8000,
    discount: 19,
    image: "https://images.unsplash.com/photo-1682994296160-49bdfdc6807a",
    alt: 'Round teak cheese board with knife slots and serving handles',
    images: [
    { url: "https://images.unsplash.com/photo-1682994296160-49bdfdc6807a", alt: 'Round teak cheese board with knife slots and serving handles' },
    { url: "https://images.unsplash.com/photo-1707079288822-be30b3d1de72", alt: 'Teak cheese board with assorted cheeses and fruits arranged' }],

    woodType: 'Teak',
    artisan: 'Nimal Fernando',
    rating: 4.8,
    reviews: 112,
    customizable: true,
    inStock: true,
    featured: false,
    description: 'Elegant teak cheese board with integrated knife storage. Perfect for entertaining and gift-giving.',
    dimensions: '35cm diameter x 2cm',
    tags: ['kitchen', 'cheese-board', 'teak']
  },
  {
    id: '8',
    name: 'Mahogany Bookends',
    category: 'home-decor',
    price: 11000,
    image: "https://images.unsplash.com/photo-1682696141155-c6b2c9477432",
    alt: 'Pair of mahogany bookends with carved elephant design',
    images: [
    { url: "https://images.unsplash.com/photo-1682696141155-c6b2c9477432", alt: 'Pair of mahogany bookends with carved elephant design' },
    { url: "https://images.unsplash.com/photo-1544418776-599869294fb1", alt: 'Close-up of mahogany bookend showing elephant carving detail' }],

    woodType: 'Mahogany',
    artisan: 'Chaminda Silva',
    rating: 4.7,
    reviews: 73,
    customizable: false,
    inStock: true,
    featured: false,
    description: 'Handcarved mahogany bookends featuring traditional elephant motifs. Functional art for your bookshelf.',
    dimensions: '20cm x 15cm x 12cm each',
    tags: ['home-decor', 'bookends', 'mahogany']
  },
  {
    id: '9',
    name: 'Custom Engraved Cutting Board',
    category: 'custom',
    price: 10000,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b955aef-1764702181867.png",
    alt: 'Wooden cutting board with custom family name engraving and decorative border',
    images: [
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_11b955aef-1764702181867.png", alt: 'Wooden cutting board with custom family name engraving and decorative border' },
    { url: "https://images.unsplash.com/photo-1638725997667-47346a462dfa", alt: 'Close-up of engraved text on cutting board showing precision detail' }],

    woodType: 'Teak',
    artisan: 'Pradeep Kumar',
    rating: 5.0,
    reviews: 201,
    customizable: true,
    inStock: true,
    featured: true,
    description: 'Personalized cutting board with custom engraving. Perfect for weddings, anniversaries, or housewarming gifts.',
    dimensions: 'Customizable',
    tags: ['custom', 'cutting-board', 'engraved']
  },
  {
    id: '10',
    name: 'Rosewood Jewelry Box',
    category: 'home-decor',
    price: 14000,
    image: "https://images.unsplash.com/photo-1659158827413-dae1d6572103",
    alt: 'Elegant rosewood jewelry box with velvet interior and brass hinges',
    images: [
    { url: "https://images.unsplash.com/photo-1659158827413-dae1d6572103", alt: 'Elegant rosewood jewelry box with velvet interior and brass hinges' },
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1daec0560-1764829451590.png", alt: 'Open rosewood jewelry box showing compartments and velvet lining' }],

    woodType: 'Rosewood',
    artisan: 'Ranjith Bandara',
    rating: 4.9,
    reviews: 87,
    customizable: true,
    inStock: true,
    featured: false,
    description: 'Luxurious rosewood jewelry box with multiple compartments. Keeps your precious items safe and organized.',
    dimensions: '25cm x 18cm x 10cm',
    tags: ['home-decor', 'jewelry-box', 'rosewood']
  },
  {
    id: '11',
    name: 'Coconut Wood Utensil Set',
    category: 'kitchen',
    price: 5500,
    image: "https://images.unsplash.com/photo-1728034261662-460ca4fbecd7",
    alt: 'Set of five coconut wood cooking utensils including spoons and spatulas',
    images: [
    { url: "https://images.unsplash.com/photo-1728034261662-460ca4fbecd7", alt: 'Set of five coconut wood cooking utensils including spoons and spatulas' },
    { url: "https://images.unsplash.com/photo-1730112636581-2d45ebb04da3", alt: 'Coconut wood utensils arranged in ceramic holder' }],

    woodType: 'Coconut Wood',
    artisan: 'Sunil Perera',
    rating: 4.6,
    reviews: 143,
    customizable: false,
    inStock: true,
    featured: false,
    description: 'Eco-friendly coconut wood utensil set. Safe for non-stick cookware and naturally antibacterial.',
    dimensions: 'Various sizes, 25-35cm length',
    tags: ['kitchen', 'utensils', 'coconut-wood']
  },
  {
    id: '12',
    name: 'Ebony Picture Frame',
    category: 'home-decor',
    price: 8000,
    originalPrice: 9500,
    discount: 16,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ac14135-1764659104500.png",
    alt: 'Elegant ebony picture frame with matte finish and glass front',
    images: [
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_14ac14135-1764659104500.png", alt: 'Elegant ebony picture frame with matte finish and glass front' },
    { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f218c7b5-1764672905919.png", alt: 'Ebony picture frame displayed on wall with family photo' }],

    woodType: 'Ebony',
    artisan: 'Nimal Fernando',
    rating: 4.8,
    reviews: 92,
    customizable: true,
    inStock: true,
    featured: false,
    description: 'Sophisticated ebony picture frame. Showcases your memories with timeless elegance.',
    dimensions: '25cm x 20cm (photo size: 20cm x 15cm)',
    tags: ['home-decor', 'picture-frame', 'ebony']
  }];


  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag:string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((product) =>
      filters.categories.includes(product.category)
      );
    }

    if (filters.woodTypes.length > 0) {
      result = result.filter((product) =>
      filters.woodTypes.includes(product.woodType)
      );
    }

    if (filters.artisans.length > 0) {
      result = result.filter((product) =>
      filters.artisans.includes(product.artisan)
      );
    }

    result = result.filter(
      (product) =>
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    );

    if (filters.customizable !== null) {
      result = result.filter(
        (product) => product.customizable === filters.customizable
      );
    }

    if (filters.inStock !== null) {
      result = result.filter((product) => product.inStock === filters.inStock);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery, products]);

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      woodTypes: [],
      priceRange: { min: 0, max: 100000 },
      customizable: null,
      inStock: null,
      artisans: []
    });
    setSearchQuery('');
  };

  const handleAddToWishlist = (productId: string) => {
    setWishlist((prev) =>
    prev.includes(productId) ?
    prev.filter((id) => id !== productId) :
    [...prev, productId]
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Shop - Hera Handcrafted | Premium Sri Lankan Wooden Products</title>
        <meta
          name="description"
          content="Discover our collection of handcrafted wooden products. Kitchen essentials, home décor, and custom creations made by skilled Sri Lankan artisans." />

      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 lg:pt-24">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-2">
                Shop Our Collection
              </h1>
              <p className="font-body text-base text-muted-foreground">
                Discover handcrafted wooden treasures from Sri Lankan artisans
              </p>
            </div>

            <CategoryTiles categories={categoryTiles} />

            <div className="mb-6">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search by product name, wood type, or artisan..." />

            </div>

            <div className="flex gap-6">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                isMobileOpen={isMobileFilterOpen}
                onMobileClose={() => setIsMobileFilterOpen(false)} />


              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="lg:hidden"
                      iconName="SlidersHorizontal"
                      iconPosition="left">

                      Filters
                    </Button>
                    <p className="font-body text-sm text-muted-foreground">
                      Showing {indexOfFirstProduct + 1}-
                      {Math.min(indexOfLastProduct, filteredProducts.length)} of{' '}
                      {filteredProducts.length} products
                    </p>
                  </div>

                  <div className="w-full sm:w-auto">
                    <Select
                      options={sortOptions.map((opt) => ({
                        value: opt.value,
                        label: opt.label
                      }))}
                      value={sortBy}
                      onChange={setSortBy}
                      placeholder="Sort by" />

                  </div>
                </div>

                {currentProducts.length > 0 ?
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                      {currentProducts.map((product) =>
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedProduct}
                      onAddToWishlist={handleAddToWishlist}
                      isWishlisted={wishlist.includes(product.id)} />

                    )}
                    </div>

                    {totalPages > 1 &&
                  <div className="flex items-center justify-center gap-2">
                        <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page">

                          <Icon name="ChevronLeft" size={20} />
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) =>
                      <Button
                        key={pageNumber}
                        variant={
                        currentPage === pageNumber ? 'default' : 'outline'
                        }
                        size="default"
                        onClick={() => handlePageChange(pageNumber)}
                        className="min-w-[40px]">

                              {pageNumber}
                            </Button>

                    )}

                        <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page">

                          <Icon name="ChevronRight" size={20} />
                        </Button>
                      </div>
                  }
                  </> :

                <div className="text-center py-16">
                    <Icon
                    name="Search"
                    size={64}
                    className="mx-auto mb-4 text-muted-foreground" />

                    <h3 className="font-headline text-xl font-semibold text-primary mb-2">
                      No products found
                    </h3>
                    <p className="font-body text-base text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button variant="default" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                }
              </div>
            </div>
          </div>
        </main>

        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)} />

      </div>
    </>);

};

export default Shop;