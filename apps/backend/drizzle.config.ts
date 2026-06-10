import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

for (const envPath of [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../../.env')
]) {
  loadEnv({ path: envPath, quiet: true });
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? ''
  },
  strict: true,
  verbose: true
});
