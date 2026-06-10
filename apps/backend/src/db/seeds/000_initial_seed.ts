import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SELECT 1');
}
