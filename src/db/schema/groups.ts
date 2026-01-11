/**
 * Groups Schema
 *
 * グループ情報を管理するテーブル。
 * 家族やルームメイトなどで収支を共有するためのグループ。
 */

import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const groups: PgTableWithColumns<any> = pgTable("groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});
