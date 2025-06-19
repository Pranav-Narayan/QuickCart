// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    if (token) {
        try {
            const user = jwt.verify(token, process.env.TOKEN_SECRET);
            const response = NextResponse.next();
            response.headers.set('x-user-id', user.id);
            response.headers.set('x-user-name', user.name);
            return response;
        } catch (e) {
            return NextResponse.json({ error: e });
        }
    }

    // return NextResponse.next();
    const response = NextResponse.next();
    response.headers.set('x-user-id', "No id");
    response.headers.set('x-user-name', "No user");
    return response;
}
