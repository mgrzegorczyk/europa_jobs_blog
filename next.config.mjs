/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ej-prod-2.fra1.digitaloceanspaces.com',
            },
        ],
    },
};

export default nextConfig;
