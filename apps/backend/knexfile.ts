import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import type { Knex } from 'knex';

for (const envPath of [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../../.env')
]) {
  loadEnv({ path: envPath, quiet: true });
}

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.resolve(__dirname, 'src/db/migrations'),
    extension: 'ts',
    tableName: 'knex_migrations'
  },
  pool: {
    min: 0,
    max: 10
  }
};

export default config;
