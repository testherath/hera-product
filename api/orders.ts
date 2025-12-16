
import { db } from '../src/db';
import { orders, orderItems } from '../src/db/schema';
import { sql } from 'drizzle-orm';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method === 'POST') {
        try {
            const { customers, items, paymentMethod, totalAmount } = await request.json();

            // 1. Create Order
            const orderNumber = `HH${Date.now().toString().slice(-8)}`;

            const [newOrder] = await db.insert(orders).values({
                orderNumber,
                customerName: `${customers.firstName} ${customers.lastName}`,
                customerEmail: customers.email,
                customerPhone: customers.phone,
                shippingAddress: JSON.stringify({
                    line1: customers.addressLine1,
                    line2: customers.addressLine2,
                    city: customers.city,
                    province: customers.province,
                    postalCode: customers.postalCode,
                    country: customers.country,
                }),
                totalAmount, // Assuming this is passed from frontend, or could calculate server-side
                status: 'pending'
            }).returning();

            // 2. Create Order Items
            if (newOrder && items && items.length > 0) {
                const orderItemsData = items.map((item: any) => ({
                    orderId: newOrder.id,
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price
                }));

                await db.insert(orderItems).values(orderItemsData);
            }

            return new Response(JSON.stringify({
                success: true,
                orderNumber: newOrder.orderNumber
            }), {
                status: 201,
                headers: { 'content-type': 'application/json' },
            });

        } catch (error) {
            console.error('Order creation failed:', error);
            return new Response(JSON.stringify({ error: 'Failed to create order' }), {
                status: 500,
                headers: { 'content-type': 'application/json' },
            });
        }
    }

    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}
