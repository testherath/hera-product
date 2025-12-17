import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import AddProductModal from './AddProductModal';
import { Product } from '../../../pages/shop/types';

const AdminProducts = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-headline font-bold text-primary">Products</h1>
                <Button onClick={() => setIsAddModalOpen(true)} iconName="Plus">Add Product</Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
                    No products found. Start by adding one.
                </div>
            ) : (
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Stock</th>
                                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-muted/5 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <img
                                            src={product.image || product.images?.[0]?.url || '/placeholder.jpg'}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-md object-cover bg-muted"
                                        />
                                        <span className="font-medium">{product.name}</span>
                                    </td>
                                    <td className="p-4 text-muted-foreground">{product.category}</td>
                                    <td className="p-4 font-medium">LKR {product.price.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.inStock
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onProductAdded={fetchProducts}
            />
        </div>
    );
};

export default AdminProducts;
