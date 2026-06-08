import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';

/**
 * Early-access waitlist. One row per signup.
 *
 * `referralCode` is this person's own code to share. `referredBy` stores the
 * `referralCode` of whoever brought them in (null for organic signups). Queue
 * position is derived at read time from referral counts — see the route handler.
 */
export const waitlist = pgTable(
  'waitlist',
  {
    id:           uuid('id').primaryKey().defaultRandom(),
    email:        text('email').notNull().unique(),
    spendBracket: text('spend_bracket'),
    referralCode: text('referral_code').notNull().unique(),
    referredBy:   text('referred_by'),
    createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('waitlist_referred_by_idx').on(t.referredBy)],
);

export type WaitlistRow = typeof waitlist.$inferSelect;
