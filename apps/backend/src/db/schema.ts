import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const analysisRuns = pgTable('analysis_runs', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});
