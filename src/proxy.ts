import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const ADMIN_ROLES = ["admin", "super_admin"];

// Next 16 "proxy" convention (replaces middleware.ts); wraps next-auth withAuth.
export default withAuth(
    function middleware(req) {
        const role = (req.nextauth.token as any)?.role as string | undefined;
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/admin") && !ADMIN_ROLES.includes(role || "")) {
            const url = req.nextUrl.clone();
            url.pathname = "/dashboard";
            url.searchParams.set("denied", "admin");
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    },
);

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/checkout/:path*"],
};
