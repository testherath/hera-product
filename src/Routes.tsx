import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Cart from './pages/cart';
import ProductDetails from './pages/product-details';
import Shop from './pages/shop';
import CustomOrders from './pages/custom-orders';
import Checkout from './pages/checkout';
import Homepage from './pages/homepage';
import { UserList } from './components/UserList';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/dashboard';
import AdminProducts from './pages/admin/products';
import AdminOrders from './pages/admin/orders';
import AdminCustomers from './pages/admin/customers';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/custom-orders" element={<CustomOrders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/db-demo" element={<UserList />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
