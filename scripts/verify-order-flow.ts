
import 'dotenv/config';
import { db } from '../src/db';
import { orders, orderItems } from '../src/db/schema';
import { eq } from 'drizzle-orm';

async function verifyOrderFlow() {
    console.log('1. Sending mock order to API...');

    // Mock Order Data
    const mockOrder = {
        customers: {
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phone: "1234567890",
            addressLine1: "123 Test St",
            city: "Test City",
            province: "Test Province",
            postalCode: "12345",
            country: "lk",
            paymentMethod: "card"
        },
        items: [
            { id: "1", name: "Test Product", quantity: 1, price: 5000 }
        ],
        totalAmount: 5000,
        paymentMethod: "card"
    };

    try {
        // Direct DB Insert Test (Since API is on running server, we can test DB logic directly first)
        // OR try to fetch localhost?
        // Let's test the DB logic that the API uses, by importing the handler logic? No, Handler uses Request object.
        // Best way: Use fetch to hit the running dev server.

        // Direct Handler Test
        const { default: handler } = await import('../api/orders');

        const request = new Request('http://localhost:3000/api/orders', {
            method: 'POST',
            body: JSON.stringify(mockOrder)
        });

        const response = await handler(request);

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Handler failed: ${response.status} ${text}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (!data.success || !data.orderNumber) {
            throw new Error('API did not return success or orderNumber');
        }

        console.log(`2. Verifying Order ${data.orderNumber} in Database...`);

        const savedOrder = await db.query.orders.findFirst({
            where: eq(orders.orderNumber, data.orderNumber),
            with: {
                // items: true // If relation was defined in schema relations, but we didn't define relations yet.
            }
        });

        if (!savedOrder) {
            throw new Error('Order not found in database!');
        }

        console.log('Order found:', savedOrder);

        const savedItems = await db.select().from(orderItems).where(eq(orderItems.orderId, savedOrder.id));

        if (savedItems.length !== 1) {
            throw new Error(`Expected 1 order item, found ${savedItems.length}`);
        }

        console.log('Order Items found:', savedItems);

        // Cleanup
        console.log('3. Cleaning up test data...');
        await db.delete(orderItems).where(eq(orderItems.orderId, savedOrder.id));
        await db.delete(orders).where(eq(orders.id, savedOrder.id));
        console.log('Cleanup complete.');

        console.log('✅ VERIFICATION SUCCESSFUL: API creates order and saves to DB correctly.');

    } catch (error) {
        console.error('❌ VERIFICATION FAILED:', error);
        process.exit(1);
    }
}

verifyOrderFlow();
