import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z
  .object({
    PORT: z.string().min(1, 'PORT is required.').transform(Number),
    ALLOWED_ORIGINS: z.string().min(1, 'ALLOWED_ORIGINS is required.').transform((val) => val.split(',').map((origin) => origin.trim())),
    MONGO_DB_URL: z.string().min(1, 'MONGO_DB_URL is required.'),
    REDIS_URL: z.string().min(1, 'REDIS_URL is required.'),
    DATABASE_HOST: z.hostname().min(1, 'DATABASE_HOST is required.'),
    DATABASE_PORT: z.string().min(1, 'DATABASE_PORT is required.').transform(Number),
    DATABASE_NAME: z.string().min(1, 'DATABASE_NAME is required.'),
    DATABASE_USERNAME: z.string().min(1, 'DATABASE_USERNAME is required.'),
    DATABASE_PASSWORD: z.string().min(1, 'DATABASE_PASSWORD is required.'),
    SERVER_URL: z.string().min(1, 'SERVER_URL is required.'),
    THROTTLER_LIMITER: z.string().min(1, 'THROTTLER_LIMITER is required.').transform(Number),
    ITEMS_PER_PAGE: z.string().min(1, 'ITEMS_PER_PAGE is required.').transform(Number),
    CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required.'),
    CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required.'),
    CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required.'),
  })
  .passthrough();

type envType = z.infer<typeof envSchema>;

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error('❌ Config validation error:', envParsed.error.format());
  throw new Error('Invalid environment variables');
}

export const envs: envType = {
  PORT: envParsed.data.PORT,
  ALLOWED_ORIGINS: envParsed.data.ALLOWED_ORIGINS,
  MONGO_DB_URL: envParsed.data.MONGO_DB_URL,
  REDIS_URL: envParsed.data.REDIS_URL,
  DATABASE_HOST: envParsed.data.DATABASE_HOST,
  DATABASE_PORT: envParsed.data.DATABASE_PORT,
  DATABASE_NAME: envParsed.data.DATABASE_NAME,
  DATABASE_USERNAME: envParsed.data.DATABASE_USERNAME,
  DATABASE_PASSWORD: envParsed.data.DATABASE_PASSWORD,
  SERVER_URL: envParsed.data.SERVER_URL,
  THROTTLER_LIMITER: envParsed.data.THROTTLER_LIMITER,
  ITEMS_PER_PAGE: envParsed.data.ITEMS_PER_PAGE,
  CLOUDINARY_CLOUD_NAME: envParsed.data.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: envParsed.data.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: envParsed.data.CLOUDINARY_API_SECRET,
};