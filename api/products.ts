
import { db } from '../src/db/index.js';
import { products } from '../src/db/schema.js';
import { sql } from 'drizzle-orm';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (request.method === 'GET') {
        try {
            if (id) {
                // Fetch single product
                const product = await db.select().from(products).where(sql`${products.id} = ${id}`);

                if (product.length === 0) {
                    return new Response(JSON.stringify({ error: 'Product not found' }), {
                        status: 404,
                        headers: { 'content-type': 'application/json' },
                    });
                }

                const p = product[0];
                const parsedProduct = {
                    ...p,
                    images: JSON.parse(p.images),
                    tags: JSON.parse(p.tags)
                };

                return new Response(JSON.stringify(parsedProduct), {
                    status: 200,
                    headers: { 'content-type': 'application/json' },
                });
            }

            // Fetch all products
            const allProducts = await db.select().from(products);

            // Parse JSON fields back to objects
            const parsedProducts = allProducts.map(p => ({
                ...p,
                images: JSON.parse(p.images),
                tags: JSON.parse(p.tags)
            }));

            return new Response(JSON.stringify(parsedProducts), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
                status: 500,
                headers: { 'content-type': 'application/json' },
            });
        }
    }

    if (request.method === 'POST') {
        try {
            const body = await request.json();

            // Basic validation could go here

            const newProduct = await db.insert(products).values({
                ...body,
                images: JSON.stringify(body.images), // Ensure arrays are stringified
                tags: JSON.stringify(body.tags),
                createdAt: new Date(),
            }).returning();

            return new Response(JSON.stringify(newProduct[0]), {
                status: 201,
                headers: { 'content-type': 'application/json' },
            });
        } catch (error) {
            console.error('Error creating product:', error);
            return new Response(JSON.stringify({ error: 'Failed to create product' }), {
                status: 500,
                headers: { 'content-type': 'application/json' },
            });
        }
    }

    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}
