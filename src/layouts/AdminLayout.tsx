import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { UserButton } from "@clerk/clerk-react";
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
        { label: 'Products', path: '/admin/products', icon: 'Package' },
        { label: 'Orders', path: '/admin/orders', icon: 'ShoppingCart' },
        { label: 'Customers', path: '/admin/customers', icon: 'Users' },
    ];

    const isActive = (path: string) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 index-40 bg-card border-r border-border transition-all duration-300 transform ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'
                    } lg:static lg:block z-40`}
            >
                <div className="h-16 flex items-center justify-center border-b border-border px-4">
                    <Link to="/admin" className="flex items-center space-x-2 overflow-hidden">
                        <img
                            src="/assets/images/hera-products.jpg"
                            alt="Logo"
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        />
                        <span className={`font-headline font-semibold text-lg whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                            Hérā Admin
                        </span>
                    </Link>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive(item.path)
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                            title={!isSidebarOpen ? item.label : ''}
                        >
                            <div className="flex-shrink-0">
                                <Icon name={item.icon as any} size={20} />
                            </div>
                            <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:hidden'
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden"
                    >
                        <Icon name="Menu" size={24} />
                    </Button>
                    {/* Desktop toggle handled by width change logic, but we can add one if needed. 
                        For now, desktop sidebar is always mini or full. 
                        Let's add a toggle for desktop too actually 
                    */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex"
                    >
                        <Icon name={isSidebarOpen ? "ChevronLeft" : "ChevronRight"} size={20} />
                    </Button>

                    <div className="flex items-center space-x-4 ml-auto">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
