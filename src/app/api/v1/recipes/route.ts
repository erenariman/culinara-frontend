import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const paramsString = searchParams.toString();
        const backendPath = `/api/v1/recipes/`;
        // Append query string if exists
        const fullUrl = `${BACKEND_URL}${backendPath}${paramsString ? '?' + paramsString : ''}`;

        const response = await fetch(fullUrl, {
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const backendPath = `/api/v1/recipes/`;

        const response = await fetch(`${BACKEND_URL}${backendPath}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(request.headers.get('Authorization') ? { 'Authorization': request.headers.get('Authorization')! } : {})
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({}));
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
