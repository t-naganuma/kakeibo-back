/**
 * Categories API Tests
 *
 * GET /api/categories エンドポイントのテスト
 */

// DBモック（テストファイルの最上部、importより前に配置）
const mockOrderBy = jest.fn();
const mockWhere = jest.fn(() => ({ orderBy: mockOrderBy }));
const mockFrom = jest.fn(() => ({ where: mockWhere }));
const mockSelect = jest.fn(() => ({ from: mockFrom }));

jest.mock("../../../src/db", () => ({
	db: { select: mockSelect },
}));

import app from "../../../src/api";

// レスポンスの型定義（JSONシリアライズ後の型）
interface CategoryResponse {
	data?: Array<{
		id: string;
		groupId: string | null;
		name: string;
		type: string;
		icon: string | null;
		sortOrder: number;
		isSystem: boolean;
		createdAt: string; // JSONでは文字列にシリアライズされる
	}>;
	error?: string;
}

describe("GET /api/categories", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("groupIdなしでシステム共通カテゴリを取得できる", async () => {
		const mockDbCategories = [
			{
				id: "c1",
				groupId: null,
				name: "食費",
				type: "expense",
				icon: "🍕",
				sortOrder: 1,
				isSystem: true,
				createdAt: new Date("2024-01-01T00:00:00.000Z"),
			},
		];
		mockOrderBy.mockResolvedValue(mockDbCategories);

		const res = await app.request("/api/categories");

		expect(res.status).toBe(200);
		const json = (await res.json()) as CategoryResponse;
		// JSONシリアライズ後の期待値
		expect(json.data).toEqual([
			{
				id: "c1",
				groupId: null,
				name: "食費",
				type: "expense",
				icon: "🍕",
				sortOrder: 1,
				isSystem: true,
				createdAt: "2024-01-01T00:00:00.000Z",
			},
		]);
	});

	it("有効なUUID形式のgroupIdでカテゴリを取得できる", async () => {
		const mockDbCategories = [
			{
				id: "c1",
				groupId: null,
				name: "食費",
				type: "expense",
				icon: "🍕",
				sortOrder: 1,
				isSystem: true,
				createdAt: new Date("2024-01-01T00:00:00.000Z"),
			},
			{
				id: "c2",
				groupId: "550e8400-e29b-41d4-a716-446655440000",
				name: "外食",
				type: "expense",
				icon: "🍔",
				sortOrder: 2,
				isSystem: false,
				createdAt: new Date("2024-01-01T00:00:00.000Z"),
			},
		];
		mockOrderBy.mockResolvedValue(mockDbCategories);

		const res = await app.request(
			"/api/categories?groupId=550e8400-e29b-41d4-a716-446655440000",
		);

		expect(res.status).toBe(200);
		const json = (await res.json()) as CategoryResponse;
		// JSONシリアライズ後の期待値
		expect(json.data).toEqual([
			{
				id: "c1",
				groupId: null,
				name: "食費",
				type: "expense",
				icon: "🍕",
				sortOrder: 1,
				isSystem: true,
				createdAt: "2024-01-01T00:00:00.000Z",
			},
			{
				id: "c2",
				groupId: "550e8400-e29b-41d4-a716-446655440000",
				name: "外食",
				type: "expense",
				icon: "🍔",
				sortOrder: 2,
				isSystem: false,
				createdAt: "2024-01-01T00:00:00.000Z",
			},
		]);
	});

	it("無効なgroupId形式の場合は400エラーを返す", async () => {
		const res = await app.request("/api/categories?groupId=invalid-uuid");

		expect(res.status).toBe(400);
		const json = (await res.json()) as CategoryResponse;
		expect(json.error).toBe("Invalid groupId format");
	});

	it("DBエラー発生時は500エラーを返す", async () => {
		mockOrderBy.mockRejectedValue(new Error("Database connection failed"));

		const res = await app.request("/api/categories");

		expect(res.status).toBe(500);
		const json = (await res.json()) as CategoryResponse;
		expect(json.error).toBe("Failed to fetch categories");
	});
});
