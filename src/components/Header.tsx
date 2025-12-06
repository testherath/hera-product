import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';
import Button from './ui/Button';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Shop', path: '/shop' },
    { label: 'Custom Orders', path: '/custom-orders' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card border-b border-border ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 lg:w-10 lg:h-10"
            >
              <rect width="40" height="40" rx="8" fill="var(--color-primary)" />
              <path 
                d="M12 28V16L20 12L28 16V28H23V21H17V28H12Z" 
                fill="var(--color-primary-foreground)" 
                stroke="var(--color-primary-foreground)" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
              />
              <circle cx="20" cy="18" r="2" fill="var(--color-accent)" />
            </svg>
            <span className="font-headline text-xl lg:text-2xl font-semibold text-primary">
              Hera Handcrafted
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-body-md transition-colors duration-300 hover:text-primary ${
                  isActivePath(item.path) 
                    ? 'text-primary font-medium' :'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3 lg:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              aria-label="Search"
            >
              <Icon name="Search" size={20} />
            </Button>

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Shopping cart"
              >
                <Icon name="ShoppingCart" size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-semibold rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>

            <Link to="/checkout" className="hidden lg:block">
              <Button variant="default" size="default">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-soft">
          <nav className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg font-body text-body-md transition-colors duration-300 ${
                  isActivePath(item.path)
                    ? 'bg-surface text-primary font-medium' :'text-muted-foreground hover:bg-surface hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <Link to="/checkout" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" size="default" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;