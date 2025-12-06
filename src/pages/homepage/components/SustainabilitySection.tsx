import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { SustainabilityMetric } from '../types';

interface SustainabilitySectionProps {
  metrics: SustainabilityMetric[];
}

const SustainabilitySection = ({ metrics }: SustainabilitySectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full mb-4">
            <span className="text-accent font-semibold text-sm">Our Commitment</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sustainability at Our Core
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Every piece we create contributes to a more sustainable future, supporting both our environment and artisan communities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-colors border border-white/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Icon name={metric.icon} size={32} color="var(--color-accent)" />
              </div>
              <div className="text-4xl font-bold mb-2">{metric.value}</div>
              <div className="text-lg font-semibold mb-2">{metric.label}</div>
              <p className="text-sm opacity-80">{metric.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="font-headline text-2xl lg:text-3xl font-bold">
                Our Environmental Promise
              </h3>
              <p className="text-lg opacity-90 leading-relaxed">
                We source our wood exclusively from sustainably managed forests and participate in reforestation programs. For every product sold, we plant two trees, ensuring that our craft contributes positively to the environment.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
                  <span>100% sustainably sourced Sri Lankan wood</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
                  <span>Zero-waste production processes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
                  <span>Active reforestation partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
                  <span>Fair trade certified artisan support</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name="Leaf" size={24} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Carbon Neutral</h4>
                    <p className="text-sm opacity-80">Shipping & Production</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  All our operations are carbon neutral, from workshop to your doorstep
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name="Users" size={24} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Community Impact</h4>
                    <p className="text-sm opacity-80">Supporting Local Artisans</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  Fair wages and skill development programs for traditional craftspeople
                </p>
              </div>

              <Button variant="outline" size="lg" fullWidth className="bg-white/10 border-white/30 hover:bg-white/20">
                Learn More About Our Impact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;