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
            {
                protocol: 'https',
                hostname: 'xhouycimkbchlscgmlss.supabase.co',
                pathname: '/**',
            }
        ],
        // loader: 'custom',
        // loaderFile: './supabase-image-loader.ts',
    },
    sassOptions: {
        quietDeps: true, // This will silence the deprecation warnings
      },
};

export default nextConfig;
