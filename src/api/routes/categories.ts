/**
 * Categories Routes
 *
 * カテゴリー関連のAPIエンドポイント
 */

import { eq, isNull, or } from "drizzle-orm";
import { Hono } from "hono";
import * as v from "valibot";
import { db } from "../../db";
import { categories } from "../../db/schema";

const app = new Hono();

// UUID検証用のvalibotスキーマ
const uuidSchema = v.pipe(v.string(), v.uuid());

/**
 * UUIDの形式を検証する
 * @param value 検証する文字列
 * @returns 有効なUUIDの場合はtrue
 */
const isValidUuid = (value: string): boolean => {
	const result = v.safeParse(uuidSchema, value);
	return result.success;
};

// カテゴリー専用エラーハンドリング
app.onError((err, c) => {
	console.error("[Categories] Error:", err);
	return c.json({ error: "Failed to fetch categories" }, 500);
});

/**
 * GET /api/categories
 *
 * カテゴリー一覧を取得する
 * - groupIdなし: システム共通カテゴリのみ
 * - groupIdあり: 指定グループ専用 + システム共通カテゴリ
 */
app.get("/", async (c) => {
	const groupId = c.req.query("groupId");

	// groupIdが指定されている場合、UUID形式を検証
	if (groupId && !isValidUuid(groupId)) {
		return c.json({ error: "Invalid groupId format" }, 400);
	}

	// groupIdあり: グループ専用 + システム共通、なし: システム共通のみ
	const whereCondition = groupId
		? or(eq(categories.groupId, groupId), isNull(categories.groupId))
		: isNull(categories.groupId);

	const result = await db
		.select({
			id: categories.id,
			groupId: categories.groupId,
			name: categories.name,
			type: categories.type,
			icon: categories.icon,
			sortOrder: categories.sortOrder,
			isSystem: categories.isSystem,
			createdAt: categories.createdAt,
		})
		.from(categories)
		.where(whereCondition)
		.orderBy(categories.sortOrder);

	return c.json({ data: result });
});

export default app;
