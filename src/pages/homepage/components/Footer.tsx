import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    shop: [
      { label: 'Kitchen Essentials', path: '/shop' },
      { label: 'Home Décor', path: '/shop' },
      { label: 'Custom Orders', path: '/custom-orders' },
      { label: 'Gift Sets', path: '/shop' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Artisans', path: '/artisans' },
      { label: 'Sustainability', path: '/sustainability' },
      { label: 'Blog', path: '/blog' },
    ],
    support: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Order Tracking', path: '/order-tracking' },
      { label: 'Care Guide', path: '/care-guide' },
      { label: 'FAQs', path: '/faqs' },
    ],
  };

  const socialLinks = [
    { icon: 'Facebook', url: '#', label: 'Facebook' },
    { icon: 'Instagram', url: '#', label: 'Instagram' },
    { icon: 'Twitter', url: '#', label: 'Twitter' },
    { icon: 'Youtube', url: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center space-x-2 mb-4">
              <img
                src="/assets/images/hera-products.jpg"
                alt="Hérā Products"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="font-headline text-xl font-semibold">Hérā Products</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Preserving Sri Lankan woodworking heritage through handcrafted excellence. Each piece tells a story of tradition, sustainability, and artistry.
            </p>
            <div className="flex gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
                  aria-label={social?.label}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks?.shop?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Hérā Products. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;