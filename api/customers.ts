import { db } from '../src/db';
import { users } from '../src/db/schema';
import { desc } from 'drizzle-orm';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method === 'GET') {
        try {
            const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

            return new Response(JSON.stringify(allUsers), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        } catch (error) {
            console.error('Error fetching customers:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), {
                status: 500,
                headers: { 'content-type': 'application/json' },
            });
        }
    }

    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}
