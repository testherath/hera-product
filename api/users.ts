import { db } from '../src/db';
import { users } from '../src/db/schema';
import { sql } from '@vercel/postgres';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method === 'GET') {
        const allUsers = await db.select().from(users);
        return new Response(JSON.stringify(allUsers), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    }

    if (request.method === 'POST') {
        try {
            const { name, email } = await request.json();
            if (!name || !email) {
                return new Response(JSON.stringify({ error: 'Name and email are required' }), { status: 400 });
            }

            const newUser = await db.insert(users).values({ name, email }).returning();
            return new Response(JSON.stringify(newUser), {
                status: 201,
                headers: { 'content-type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
}
