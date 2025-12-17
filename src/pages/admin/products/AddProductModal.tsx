import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductAdded: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onProductAdded }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Kitchen Essentials',
        price: '',
        description: '',
        image: '',
        alt: '',
        woodType: 'teak',
        artisan: '',
        inStock: true,
        featured: false,
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare data for API
            // Note: images and tags are hardcoded for now as simple arrays/JSON since we don't have full UI for them yet
            const productData = {
                ...formData,
                price: parseInt(formData.price),
                rating: 5.0, // Default for new product
                reviews: 0,
                // Default structure matching schema requirements
                images: JSON.stringify([{ url: formData.image, alt: formData.alt, type: 'main' }]),
                tags: JSON.stringify(['handcrafted', 'wooden', formData.category]),
                // Other defaults
                originalPrice: null,
                discount: null,
                woodType: formData.woodType,
                customizable: false,
                dimensions: 'Standard',
            };

            // Fix conflict: API expects objects for images/tags because it runs JSON.stringify, 
            // BUT schema says these cols are text. 
            // Correct approach: Client sends JSON object usually, API handles it.
            // Let's check api/products.ts again. 
            // API: const newProduct = await db.insert(products).values({ ...body, images: JSON.stringify(body.images), ... })
            // So CLIENT should send array/object for 'images', not string.

            const payload = {
                ...formData,
                price: parseInt(formData.price),
                rating: 0,
                reviews: 0,
                images: [{ url: formData.image, alt: formData.alt, type: 'main' }],
                tags: ['handcrafted', 'new'],
                originalPrice: null,
                discount: null,
                customizable: false,
                dimensions: 'Standard'
            };

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to add product');

            onProductAdded();
            onClose();
        } catch (error) {
            console.error(error);
            alert('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card w-full max-w-2xl rounded-xl border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-headline font-semibold">Add New Product</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <Icon name="X" size={20} />
                    </Button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <form id="add-product-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Product Name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                            />

                            <Select
                                label="Category"
                                options={[
                                    { value: 'Kitchen Essentials', label: 'Kitchen Essentials' },
                                    { value: 'Home Décor', label: 'Home Décor' },
                                    { value: 'Custom Creations', label: 'Custom Creations' },
                                ]}
                                value={formData.category}
                                onChange={(val) => handleChange('category', val)}
                            />

                            <Input
                                label="Price (LKR)"
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                required
                            />

                            <Input
                                label="Artisan Name"
                                value={formData.artisan}
                                onChange={(e) => handleChange('artisan', e.target.value)}
                                required
                            />

                            <Select
                                label="Wood Type"
                                options={[
                                    { value: 'Teak', label: 'Teak' },
                                    { value: 'Mahogany', label: 'Mahogany' },
                                    { value: 'Ebony', label: 'Ebony' },
                                    { value: 'Coconut', label: 'Coconut' },
                                ]}
                                value={formData.woodType}
                                onChange={(val) => handleChange('woodType', val)}
                            />

                            <Select
                                label="In Stock"
                                options={[
                                    { value: 'true', label: 'Yes' },
                                    { value: 'false', label: 'No' },
                                ]}
                                value={String(formData.inStock)}
                                onChange={(val) => handleChange('inStock', val === 'true')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Image URL"
                                value={formData.image}
                                onChange={(e) => handleChange('image', e.target.value)}
                                placeholder="https://..."
                                required
                            />
                            <Input
                                label="Image Alt Text"
                                value={formData.alt}
                                onChange={(e) => handleChange('alt', e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
                    <Button type="submit" form="add-product-form" loading={loading}>Create Product</Button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
