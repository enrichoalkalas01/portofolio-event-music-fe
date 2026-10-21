import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProvidersNextAuth from "@/lib/providers/providers-next-auth";
import ProvidersTanstackQuery from "@/lib/providers/providers-react-query";
import ProvidersToaster from "@/lib/providers/providers-toaster";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/config";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: `${SITE_NAME} - ${SITE_TAGLINE}`,
        template: `%s | ${SITE_NAME}`,
    },
    description:
        "Platform pembelian tiket event musik terpercaya di Indonesia. Temukan konser, festival, dan acara musik favoritmu dengan mudah dan aman.",
    applicationName: SITE_NAME,
    manifest: "/manifest.json",
    openGraph: {
        type: "website",
        siteName: SITE_NAME,
        title: `${SITE_NAME} - ${SITE_TAGLINE}`,
        description:
            "Temukan konser, festival, dan acara musik favoritmu dengan mudah dan aman.",
        images: ["/music-event-banner-1.jpg"],
    },
};

export const viewport: Viewport = {
    themeColor: "#050505",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" className="dark scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                <ProvidersNextAuth>
                    <ProvidersTanstackQuery>
                        <ProvidersToaster>{children}</ProvidersToaster>
                    </ProvidersTanstackQuery>
                </ProvidersNextAuth>
            </body>
        </html>
    );
}
