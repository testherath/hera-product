import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { SeasonalCollection } from '../types';

interface SeasonalCollectionsProps {
  collections: SeasonalCollection[];
}

const SeasonalCollections = ({ collections }: SeasonalCollectionsProps) => {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Seasonal Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Limited edition pieces inspired by the changing seasons and Sri Lankan festivals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 border border-border ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`grid ${index === 0 ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-0`}>
                <div className={`relative ${index === 0 ? 'aspect-[16/9] lg:aspect-auto' : 'aspect-[4/3]'} overflow-hidden`}>
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
                  
                  <div className="absolute top-4 left-4 px-4 py-2 bg-accent rounded-full">
                    <span className="text-accent-foreground font-semibold text-sm">Limited Edition</span>
                  </div>
                </div>

                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>{formatDateRange(collection.startDate, collection.endDate)}</span>
                    </div>

                    <h3 className="font-headline text-2xl lg:text-3xl font-bold text-primary">
                      {collection.title}
                    </h3>

                    <p className="text-foreground leading-relaxed">
                      {collection.description}
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Package" size={18} />
                        <span className="font-medium">{collection.products} Products</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link to={collection.link}>
                        <Button 
                          variant={index === 0 ? 'default' : 'outline'} 
                          size="lg" 
                          iconName="ArrowRight" 
                          iconPosition="right"
                        >
                          Explore Collection
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalCollections;