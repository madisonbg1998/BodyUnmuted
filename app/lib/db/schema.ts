import { sql } from 'drizzle-orm';
import { check, date, pgTable, smallint, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const appUsers = pgTable(
  'app_users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    adharaCustomerId: text('adhara_customer_id').notNull().unique(),
    email: text('email').notNull().unique(),
    name: text('name'),
    role: text('role').notNull().default('member'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check('app_users_role_check', sql`${table.role} in ('coach', 'member')`)]
);

export const clients = pgTable(
  'clients',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    coachId: uuid('coach_id')
      .notNull()
      .references(() => appUsers.id, { onDelete: 'cascade' }),
    memberUserId: uuid('member_user_id').references(() => appUsers.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    email: text('email'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Partial unique index: only enforced when a client actually has an email
    // on file, so multiple "no email yet" roster entries don't collide.
    uniqueIndex('clients_coach_email_unique').on(table.coachId, table.email).where(sql`${table.email} is not null`),
  ]
);

export const clientSnapshots = pgTable('client_snapshots', {
  clientId: uuid('client_id')
    .primaryKey()
    .references(() => clients.id, { onDelete: 'cascade' }),
  goals: text('goals').notNull().default(''),
  startingPoint: text('starting_point').notNull().default(''),
});

export const trainingBounds = pgTable('training_bounds', {
  clientId: uuid('client_id')
    .primaryKey()
    .references(() => clients.id, { onDelete: 'cascade' }),
  ceilingDaysPerWeek: text('ceiling_days_per_week').notNull().default(''),
  ceilingSessionLength: text('ceiling_session_length').notNull().default(''),
  floorDaysPerWeek: text('floor_days_per_week').notNull().default(''),
  floorSessionLength: text('floor_session_length').notNull().default(''),
});

export const roadmaps = pgTable(
  'roadmaps',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id')
      .notNull()
      .references(() => clients.id, { onDelete: 'cascade' }),
    duration: smallint('duration').notNull(),
    startDate: date('start_date').notNull(),
  },
  (table) => [
    uniqueIndex('roadmaps_client_duration_unique').on(table.clientId, table.duration),
    check('roadmaps_duration_check', sql`${table.duration} in (3, 6, 12)`),
  ]
);

export const phases = pgTable(
  'phases',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    roadmapId: uuid('roadmap_id')
      .notNull()
      .references(() => roadmaps.id, { onDelete: 'cascade' }),
    typeId: text('type_id').notNull(),
    label: text('label').notNull(),
    color: text('color').notNull(),
    border: text('border').notNull(),
    textClass: text('text_class').notNull(),
    startMonth: smallint('start_month').notNull(),
    endMonth: smallint('end_month').notNull(),
  },
  (table) => [
    check('phases_type_id_check', sql`${table.typeId} in ('build', 'cut', 'maintenance', 'custom')`),
  ]
);

export const monthNotes = pgTable(
  'month_notes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    roadmapId: uuid('roadmap_id')
      .notNull()
      .references(() => roadmaps.id, { onDelete: 'cascade' }),
    monthIndex: smallint('month_index').notNull(),
    goal: text('goal').notNull().default(''),
  },
  (table) => [uniqueIndex('month_notes_roadmap_month_unique').on(table.roadmapId, table.monthIndex)]
);

export const lifeEvents = pgTable(
  'life_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id')
      .notNull()
      .references(() => clients.id, { onDelete: 'cascade' }),
    typeId: text('type_id').notNull(),
    title: text('title').notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date').notNull(),
    notes: text('notes').notNull().default(''),
  },
  (table) => [check('life_events_type_id_check', sql`${table.typeId} in ('travel', 'work', 'other')`)]
);
