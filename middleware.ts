import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/settings';

export default createMiddleware({
    locales: locales,
    defaultLocale: 'en',
    localePrefix: 'always'
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};