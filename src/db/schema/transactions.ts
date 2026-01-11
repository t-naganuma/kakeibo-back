/**
 * Transactions Schema
 *
 * 取引情報を管理するテーブル。
 * 収入・支出の取引を記録する。
 */

import {
  date,
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { users } from "./users";

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    groupId: uuid("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    transactionDate: date("transaction_date", { mode: "date" }).notNull(),
    description: varchar("description", { length: 200 }),
    createdBy: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("transaction_group_date_idx").on(
      table.groupId,
      table.transactionDate
    ),
  ]
);
