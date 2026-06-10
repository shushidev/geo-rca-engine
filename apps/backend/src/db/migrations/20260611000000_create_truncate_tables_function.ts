import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION truncate_tables(username IN VARCHAR) RETURNS void AS $$
    DECLARE
      statements CURSOR FOR
        SELECT tablename FROM pg_tables
        WHERE tableowner = username
          AND schemaname = 'public'
          AND tablename NOT IN (
            'migrations',
            'migrations_lock',
            'knex_migrations',
            'knex_migrations_lock'
          );
    BEGIN
      FOR stmt IN statements LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' CASCADE;';
      END LOOP;
    END;
    $$
    LANGUAGE plpgsql;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP FUNCTION IF EXISTS truncate_tables(VARCHAR)');
}
