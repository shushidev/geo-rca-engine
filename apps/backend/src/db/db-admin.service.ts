import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { type Knex } from 'knex';
import { createKnexConfig } from './knex.config';

@Injectable()
export class DbAdminService {
  constructor(private readonly configService: ConfigService) {}

  async migrateLatest() {
    const knexClient = this.createClient();

    try {
      const [batchNo, migrations] = await knexClient.migrate.latest();

      return {
        message: 'migrations run ok',
        batchNo,
        migrations
      };
    } finally {
      await knexClient.destroy();
    }
  }

  async seedData() {
    const knexClient = this.createClient();

    try {
      const [seedFiles] = await knexClient.seed.run();

      return {
        message: 'seeding ran ok!',
        seedFiles
      };
    } finally {
      await knexClient.destroy();
    }
  }

  private createClient(): Knex {
    return knex(createKnexConfig(this.configService.getOrThrow<string>('DATABASE_URL')));
  }
}
