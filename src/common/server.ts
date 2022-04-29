/**
 * Provide server configurations
 */
export const SERVER_CONFIG = {
    PORT: Number(process.env.SERVER_PORT || 3000),
    HOST: process.env.SERVER_HOST || '0.0.0.0',
    ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'x_KeSUg~->|&My7',
    PRE_CAPTCHA_TOKEN_EXPIRY_TIME: +process.env.PRE_CAPTCHA_TOKEN_EXPIRY_TIME,
    JWT_TOKEN_EXPIRY_TIME: +process.env.JWT_TOKEN_EXPIRY_TIME,
    ERROR_LOGGING: process.env.ERROR_LOGGING === 'true',
    RESPONSE_ERROR_STACK: process.env.RESPONSE_ERROR_STACK === 'true',
    RECHARGE_INTERVAL_MINUTES: 60,
    BLAST_ENERGY_EVERY_DAY: process.env.BLAST_ENERGY_EVERY_DAY,
    BLAST_ENERGY_SHOW_LIVE: process.env.BLAST_ENERGY_SHOW_LIVE,
    BACKSTAGE_ENTRY_VP: process.env.BACKSTAGE_ENTRY_VP,
    LOTTERY_FREE_ENERGY: process.env.LOTTERY_FREE_ENERGY,
    DEFAULT_PROFILE_IMAGE: process.env.DEFAULT_PROFILE_IMAGE,
    PHONE_VERIFICATION_BONUS: +process.env.PHONE_VERIFICATION_BONUS,
    EMAIL_VERIFICATION_BONUS: +process.env.EMAIL_VERIFICATION_BONUS,
    EMAIL_VERIFICATION_JWT_SECRET_KEY: process.env.EMAIL_VERIFICATION_JWT_SECRET_KEY,
};