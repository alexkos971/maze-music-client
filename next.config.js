/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
    i18n,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sefon.pro',
                // port: '',
                // pathname: '/account123/**',
            }
        ]
    }
}

module.exports = nextConfig
