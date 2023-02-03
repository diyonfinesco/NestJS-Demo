export default () => ({
    IS_PROD: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: `${process.env.JWT_SECRET}`,
    JWT_EXPIRES_IN: '7d',
    STRIPE_SECRET_KEY: `${process.env.STRIPE_SECRET_API_KEY}`,
    GOOGLE_WEB_CLIENT_ID: `${process.env.GOOGLE_WEB_CLIENT_ID}`,
    GOOGLE_ANDROID_CLIENT_ID: `${process.env.GOOGLE_ANDROID_CLIENT_ID}`,
    GOOGLE_SECRET_KEY: `${process.env.GOOGLE_CLIENT_SECRET}`,
    CLIENT_PUBLIC_URL: `${process.env.CLIENT_PUBLIC_URL}`
});
