import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-headline font-bold text-primary mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['Total Sales', 'Total Orders', 'Total Customers', 'Products'].map((stat) => (
                    <div key={stat} className="bg-card p-6 rounded-lg border border-border shadow-sm">
                        <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat}</h3>
                        <p className="text-2xl font-bold mt-2 text-primary">0</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
