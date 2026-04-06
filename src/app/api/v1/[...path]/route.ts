import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

async function handleRequest(request: Request, context: { params: Promise<{ path: string[] }> }) {
    try {
        const params = await context.params;
        const joinedPath = params.path.join('/');
        
        const { searchParams } = new URL(request.url);
        const paramsString = searchParams.toString();
        const backendPath = `/api/v1/${joinedPath}${paramsString ? '?' + paramsString : ''}`;
        
        const fullUrl = `${BACKEND_URL}${backendPath}`;

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        
        const authHeader = request.headers.get('Authorization');
        if (authHeader) {
            headers.set('Authorization', authHeader);
        }

        const fetchOptions: RequestInit = {
            method: request.method,
            headers: headers,
        };

        if (request.method !== 'GET' && request.method !== 'HEAD') {
            const text = await request.text();
            if (text) {
                fetchOptions.body = text;
            }
        }

        const response = await fetch(fullUrl, fetchOptions);

        let data = {};
        const responseText = await response.text();
        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = { message: responseText };
            }
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, context);
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, context);
}

export async function PUT(request: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, context);
}

export async function PATCH(request: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, context);
}

export async function DELETE(request: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, context);
}
