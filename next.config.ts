import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        domains: [
            "storage.googleapis.com",
            "swarnatactical.com",
            "apparel.swarnatactical.com",
            "apparel-dev.swarnatactical.com",
            "api-backend.swarnatactical.com",
            "api-backend-dev.swarnatactical.com",
            "files.swarnatactical.com",
            "swarnatactical.com",
            "minio-api.enrichoalkalas.my.id",
            "localhost",
            "127.0.0.1",
            "*",
        ],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "5550",
                pathname: "/api/v1/files/view/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "5550",
                pathname: "/api/v1/files/view/**",
            },
            {
                protocol: "https",
                hostname: "api-backend-dev.swarnatactical.com",
                pathname: "/api/v1/files/view/**",
            },
            {
                protocol: "https",
                hostname: "files.swarnatactical.com",
                pathname: "/**",
            },

            // {
            //     protocol: "https",
            //     hostname: "swarnatactical.com",
            //     pathname: "/wp-content/uploads/**",
            // },
            {
                protocol: "https",
                hostname: "swarnatactical.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "minio-api.enrichoalkalas.my.id",
                pathname: "/**",
            },

            {
                protocol: "https",
                hostname: "storage.googleapis.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "apparel.swarnatactical.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "apparel-dev.swarnatactical.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "api-backend.swarnatactical.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
