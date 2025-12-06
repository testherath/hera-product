import { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { ArtisanStory } from '../types';

interface ArtisanStoriesProps {
  stories: ArtisanStory[];
}

const ArtisanStories = ({ stories }: ArtisanStoriesProps) => {
  const [selectedArtisan, setSelectedArtisan] = useState(0);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Meet Our Master Craftspeople
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every piece is crafted by skilled artisans who have dedicated their lives to preserving Sri Lankan woodworking traditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={stories[selectedArtisan].image}
              alt={stories[selectedArtisan].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center gap-3 text-white">
                <Icon name="Award" size={24} color="var(--color-accent)" />
                <div>
                  <p className="text-sm opacity-90">Specialization</p>
                  <p className="font-semibold">{stories[selectedArtisan].specialization}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-headline text-3xl font-bold text-primary">
                {stories[selectedArtisan].name}
              </h3>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Briefcase" size={18} />
                  <span>{stories[selectedArtisan].role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  <span>{stories[selectedArtisan].experience}</span>
                </div>
              </div>
            </div>

            <p className="text-foreground leading-relaxed text-lg">
              {stories[selectedArtisan].story}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {stories.map((artisan, index) => (
                <button
                  key={artisan.id}
                  onClick={() => setSelectedArtisan(index)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    index === selectedArtisan
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-surface text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {artisan.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="pt-4">
              <Button variant="outline" size="lg" iconName="Users" iconPosition="left">
                Meet All Artisans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStories;