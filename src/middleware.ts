import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['he'],

    // Used when no locale matches
    defaultLocale: 'he'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(he)/:path*']
};