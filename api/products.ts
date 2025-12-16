
import { db } from '../src/db/index.js';
import { products } from '../src/db/schema.js';
import { sql } from 'drizzle-orm';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method === 'GET') {
        try {
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
            return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
                status: 500,
                headers: { 'content-type': 'application/json' },
            });
        }
    }

    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}
