import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/perfil"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isProtected = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    if (!isProtected) return NextResponse.next();

    // Check for NextAuth session token (JWT strategy)
    const token =
        request.cookies.get("__Secure-next-auth.session-token")?.value ??
        request.cookies.get("next-auth.session-token")?.value;

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
