import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 lg:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full mb-4">
              <span className="text-accent-foreground font-semibold text-sm">Start Your Journey</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
              Create Your Custom Masterpiece
            </h2>

            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Work directly with our master craftspeople to design a one-of-a-kind piece that perfectly matches your vision. From personalized engravings to custom dimensions, bring your ideas to life.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link to="/custom-orders">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  iconName="Sparkles" 
                  iconPosition="left"
                >
                  Start Custom Order
                </Button>
              </Link>
              <Link to="/shop">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 text-primary-foreground border-white/30 hover:bg-white/20"
                  iconName="ShoppingBag" 
                  iconPosition="left"
                >
                  Browse Collection
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center gap-2 text-primary-foreground">
                <Icon name="Clock" size={32} />
                <span className="font-semibold">2-3 Weeks</span>
                <span className="text-sm opacity-80">Crafting Time</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-primary-foreground">
                <Icon name="Shield" size={32} />
                <span className="font-semibold">Lifetime</span>
                <span className="text-sm opacity-80">Quality Guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-primary-foreground">
                <Icon name="Heart" size={32} />
                <span className="font-semibold">100%</span>
                <span className="text-sm opacity-80">Handcrafted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;