import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DRIZZLE_DB, PG_POOL } from './db.constants';
import * as schema from './schema';

export const databaseProviders = [
  {
    provide: PG_POOL,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      new Pool({
        connectionString: configService.getOrThrow<string>('DATABASE_URL')
      })
  },
  {
    provide: DRIZZLE_DB,
    inject: [PG_POOL],
    useFactory: (pool: Pool) =>
      drizzle(pool, {
        schema
      })
  }
];
