import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BrandValue } from '../types';

interface BrandStoryProps {
  values: BrandValue[];
}

const BrandStory = ({ values }: BrandStoryProps) => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
              <span className="text-accent font-semibold text-sm">Our Heritage</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Crafting Stories, One Piece at a Time
            </h2>

            <p className="text-lg text-foreground leading-relaxed">
              Hera Products embodies the soul of Sri Lankan woodworking heritage, where each piece tells a story of generations-old craftsmanship meeting contemporary lifestyle needs. We represent the intersection of sustainability, artistry, and functionality—creating heirloom-quality pieces that transform houses into homes.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Our commitment goes beyond creating beautiful wooden products. We're preserving traditional techniques, supporting local artisan communities, and ensuring that every piece carries the warmth and authenticity that only handcrafted items can provide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {values.map((value) =>
              <div key={value.id} className="flex items-start gap-3 p-4 bg-surface rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={value.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="default" size="lg" iconName="BookOpen" iconPosition="left">
                Our Story
              </Button>
              <Button variant="outline" size="lg" iconName="Users" iconPosition="left">
                Meet Our Artisans
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1712374309372-6901e4aa65b7"
                    alt="Skilled artisan carefully carving intricate patterns into dark wooden bowl in traditional workshop"
                    className="w-full h-full object-cover" />

                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1590474832266-60a7e39cbc89"
                    alt="Close-up of artisan hands smoothing polished wooden cutting board with natural grain patterns"
                    className="w-full h-full object-cover" />

                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1516972810927-80185027ca84"
                    alt="Traditional woodworking tools arranged on workbench with wood shavings and measuring instruments"
                    className="w-full h-full object-cover" />

                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_17329caa5-1764753289853.png"
                    alt="Finished handcrafted wooden serving tray with natural wood grain displayed on rustic table"
                    className="w-full h-full object-cover" />

                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>);

};

export default BrandStory;