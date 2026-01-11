/**
 * Transaction Items Schema
 *
 * 取引明細を管理するテーブル。
 * 各取引に対して複数の明細を持つことができる。
 */

import {
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { transactions } from "./transactions";

export const transactionItems = pgTable(
  "transaction_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    transactionId: uuid("transaction_id")
      .notNull()
      .references(() => transactions.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    amount: integer("amount").notNull(),
    memo: varchar("memo", { length: 200 }),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("transaction_item_transaction_idx").on(table.transactionId),
    index("transaction_item_category_idx").on(table.categoryId),
  ]
);
