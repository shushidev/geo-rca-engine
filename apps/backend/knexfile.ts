import { config as loadEnv } from 'dotenv';
import { resolve } from 'node:path';
import { createKnexConfig } from './src/db/knex.config';

for (const envPath of [
  resolve(process.cwd(), '.env'),
  resolve(process.cwd(), '../../.env')
]) {
  loadEnv({ path: envPath, quiet: true });
}

export default createKnexConfig();
