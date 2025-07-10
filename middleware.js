import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

    // const path = request.nextUrl.pathname;
    // const isPublicpath = path === '/cart' || path === '/Buynow'

    // Skip middleware for static assets and API routes
    if (
        request.nextUrl.pathname.startsWith("/_next") ||
        request.nextUrl.pathname.startsWith("/api") ||
        request.nextUrl.pathname.startsWith("/static")
    ) {
        return NextResponse.next();
    }

    console.log("Middleware processing URL:", request.url);

    const token = request.cookies.get("token")?.value;

    // if (isPublicpath && !token) {
    //     return NextResponse.redirect(new URL('/Login', request.url))
    // }

    if (!token) {
        console.log("No token found in cookies");
        return NextResponse.next();
    }

    if (!process.env.TOKEN_SECRET) {
        console.error("TOKEN_SECRET is not defined");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    try {
        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const response = NextResponse.next();
        response.headers.set("x-user-id", payload.id);
        response.headers.set("x-user-name", payload.username);
        response.headers.set("x-user-email", payload.email);
        return response;
    } catch (e) {
        console.error("Middleware JWT verification failed:", e.message);
        const response = NextResponse.next();
        response.cookies.delete("token"); // Clear invalid token
        return response;
        // Alternatively, redirect to login:
        // return NextResponse.redirect(new URL("/login", request.url));
    }
}

// export const config = {
//     matcher: [
//         '/',
//         '/cart',
//         '/Buynow',
//         '/profile',
//         '/profile/:path*'
//     ]
// }