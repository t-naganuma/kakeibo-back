/**
 * Groups Schema
 *
 * グループ情報を管理するテーブル。
 * 家族やルームメイトなどで収支を共有するためのグループ。
 */

import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const groups = pgTable("groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  ownerId: uuid("owner_id").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});
