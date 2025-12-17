import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';
import Button from './ui/Button';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

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
            {/* Logo Image */}
            <img
              src="/assets/images/hera-products.jpg"
              alt="Hérā Products"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-cover"
            />
            <span className="font-headline text-xl lg:text-2xl font-semibold text-primary">
              Hérā Products
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-body-md transition-colors duration-300 hover:text-primary ${isActivePath(item.path)
                  ? 'text-primary font-medium' : 'text-muted-foreground'
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

            {/* Clerk Authentication Buttons */}
            <div className="hidden lg:block">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="default" size="default">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
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
                className={`block py-2 px-3 rounded-lg font-body text-body-md transition-colors duration-300 ${isActivePath(item.path)
                  ? 'bg-surface text-primary font-medium' : 'text-muted-foreground hover:bg-surface hover:text-primary'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              {/* Mobile Auth Buttons */}
              <div className="flex justify-start">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="default" size="default" fullWidth>
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="px-3">
                    <UserButton showName />
                  </div>
                </SignedIn>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
