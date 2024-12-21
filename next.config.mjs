import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
    output: 'standalone',
    images: {
        unoptimized: true,
        domains: [],
    },
};

export default withNextIntl(config);