/**
 * Budgets Schema
 *
 * 予算情報を管理するテーブル。
 * グループ単位で月次予算を設定する。
 */

import { integer, pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { groups } from "./groups";

export const budgets = pgTable(
	"budgets",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		groupId: uuid("group_id")
			.notNull()
			.references(() => groups.id),
		year: integer("year"),
		month: integer("month"),
		amount: integer("amount").notNull(),
		createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		unique("group_period_idx").on(table.groupId, table.year, table.month),
	],
);
