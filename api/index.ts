export const config = {
    runtime: 'edge',
};

export default function handler(request: Request) {
    return new Response(
        JSON.stringify({
            message: 'Hello form Vercel Function!',
        }),
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        },
    );
}
