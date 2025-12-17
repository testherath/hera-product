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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
        <title>Shop - Hérā Products | Premium Sri Lankan Wooden Products</title>
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
                    {!isLoading && (
                      <p className="font-body text-sm text-muted-foreground">
                        Showing {indexOfFirstProduct + 1}-
                        {Math.min(indexOfLastProduct, filteredProducts.length)} of{' '}
                        {filteredProducts.length} products
                      </p>
                    )}
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

                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-16 text-red-500">
                    <p>{error}</p>
                  </div>
                ) : currentProducts.length > 0 ? (
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
                  </>) : (

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
                )}
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