import Icon from '../../../components/AppIcon';
import { Product } from '../types';

interface ProductSpecificationsProps {
  product: Product;
}

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const specifications = [
    { icon: 'TreePine', label: 'Material', value: product.specifications.material },
    { icon: 'Sparkles', label: 'Finish', value: product.specifications.finish },
    { icon: 'Droplet', label: 'Care', value: product.specifications.care },
    { icon: 'MapPin', label: 'Origin', value: product.specifications.origin },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-semibold text-primary mb-4">
          Product Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={spec.icon} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {spec.label}
                  </p>
                  <p className="text-base font-medium text-primary">{spec.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-card rounded-xl border border-border">
        <h3 className="text-lg font-headline font-semibold text-primary mb-4 flex items-center gap-2">
          <Icon name="FileText" size={20} />
          Detailed Description
        </h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {product.longDescription}
        </p>
      </div>

      <div className="p-6 bg-success/5 rounded-xl border border-success/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Leaf" size={24} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold text-success mb-2">
              Sustainability Commitment
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This product is crafted from sustainably sourced Sri Lankan wood. We partner with local reforestation initiatives to plant three trees for every product sold, ensuring our craft contributes positively to the environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;