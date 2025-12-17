
import { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

// Define type based on schema
interface Customer {
    id: number;
    name: string;
    email: string;
    image: string | null;
    createdAt: string;
}

const AdminCustomers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/customers');
                if (response.ok) {
                    const data = await response.json();
                    setCustomers(data);
                }
            } catch (error) {
                console.error('Failed to fetch customers', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-headline font-bold text-primary">Customers</h1>
                <Button variant="outline" iconName="Download">Export CSV</Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : customers.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
                    No customers found. (Users will appear here after they sign up)
                </div>
            ) : (
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Joined Date</th>
                                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-muted/5 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                            {customer.image ? (
                                                <img src={customer.image} alt={customer.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-semibold text-primary">{customer.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <span className="font-medium">{customer.name}</span>
                                    </td>
                                    <td className="p-4 text-muted-foreground">{customer.email}</td>
                                    <td className="p-4 text-muted-foreground">
                                        {new Date(customer.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="ghost" size="sm">View Orders</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminCustomers;
