/**
 * Users Schema
 *
 * ユーザー情報を管理するテーブル。
 */

import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import { pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { groups } from "./groups";

export const users: PgTableWithColumns<any> = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cognitoSub: varchar("cognito_sub", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    groupId: uuid("group_id").references(() => groups.id),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [unique("cognito_sub_idx").on(table.cognitoSub)]
);
