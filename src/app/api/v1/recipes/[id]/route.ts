import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const backendPath = `/api/v1/recipes/${id}`;

        const response = await fetch(`${BACKEND_URL}${backendPath}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(request.headers.get('Authorization') ? { 'Authorization': request.headers.get('Authorization')! } : {})
            },
        });

        const data = await response.json().catch(() => ({}));
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
