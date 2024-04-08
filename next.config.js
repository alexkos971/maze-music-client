/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
    i18n,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            }
        ]
    },
    webpack(config) {
        config.module.rules.push({
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
            titleProp: true,
          },
          test: /\.svg$/,
        });
    
        return config;
    }
}

module.exports = nextConfig
