/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '54321',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '54323',
                pathname: '/**',
            },
        ],
        // loader: 'custom',
        // loaderFile: './supabase-image-loader.ts',
    }
};

export default nextConfig;
