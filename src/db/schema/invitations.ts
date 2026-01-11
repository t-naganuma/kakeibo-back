/**
 * Invitations Schema
 *
 * グループへの招待を管理するテーブル。
 * 招待コードを使って他のユーザーをグループに招待する。
 */

import {
	index,
	pgTable,
	timestamp,
	unique,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { users } from "./users";

export const invitations = pgTable(
	"invitations",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		groupId: uuid("group_id")
			.notNull()
			.references(() => groups.id),
		code: varchar("code", { length: 8 }).notNull(),
		createdBy: uuid("created_by")
			.notNull()
			.references(() => users.id),
		usedBy: uuid("used_by").references(() => users.id),
		usedAt: timestamp("used_at", { mode: "date", withTimezone: true }),
		expiresAt: timestamp("expires_at", {
			mode: "date",
			withTimezone: true,
		}).notNull(),
		createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		unique("invitation_code_idx").on(table.code),
		index("invitation_group_history_idx").on(table.groupId, table.createdAt),
		index("invitation_expires_idx").on(table.expiresAt),
	],
);
