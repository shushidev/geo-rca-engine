import { readdir } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import type { Knex } from 'knex';

const isTypeScriptRuntime = __filename.endsWith('.ts');
const migrationExtension = isTypeScriptRuntime ? '.ts' : '.js';

type FileMigration = {
  file: string;
  fullPath: string;
  recordedName: string;
};

class StableFileMigrationSource implements Knex.MigrationSource<FileMigration> {
  constructor(private readonly directory: string) {}

  async getMigrations(): Promise<FileMigration[]> {
    const files = await readdir(this.directory);

    return files
      .filter(file => extname(file) === migrationExtension)
      .sort()
      .map(file => ({
        file,
        fullPath: resolve(this.directory, file),
        recordedName: file.replace(/\.js$/, '.ts')
      }));
  }

  getMigrationName(migration: FileMigration): string {
    return migration.recordedName;
  }

  async getMigration(migration: FileMigration): Promise<Knex.Migration> {
    return require(migration.fullPath);
  }
}

export function createKnexConfig(databaseUrl = process.env.DATABASE_URL): Knex.Config {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to configure Knex');
  }

  const connection: Knex.StaticConnectionConfig =
    process.env.DATABASE_SSL === 'true'
      ? {
          connectionString: databaseUrl,
          timezone: 'UTC',
          ssl: {
            rejectUnauthorized: false,
            requestCert: true
          }
        }
      : {
          connectionString: databaseUrl,
          timezone: 'UTC'
        };

  return {
    client: 'pg',
    connection,
    migrations: {
      tableName: 'migrations',
      migrationSource: new StableFileMigrationSource(resolve(__dirname, 'migrations'))
    },
    seeds: {
      directory: resolve(__dirname, 'seeds'),
      extension: isTypeScriptRuntime ? 'ts' : 'js'
    },
    pool: {
      min: 2,
      max: 10
    }
  };
}

export default createKnexConfig;
