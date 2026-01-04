/**
 * Categories Schema
 *
 * カテゴリー情報を管理するテーブル。
 * 収入・支出を分類するためのカテゴリー。
 */

import {
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { groups } from "./groups";

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    groupId: uuid("group_id").references(() => groups.id),
    name: varchar("name", { length: 50 }).notNull(),
    type: varchar("type", { length: 10 }).notNull(),
    icon: varchar("icon", { length: 50 }),
    sortOrder: integer("sort_order").notNull().default(0),
    isSystem: boolean("is_system").notNull().default(false),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("category_list_idx").on(table.groupId, table.type, table.sortOrder),
  ]
);
