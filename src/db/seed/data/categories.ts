/**
 * Seed Data: Categories
 *
 * テスト用カテゴリーデータ
 * - システム共通カテゴリ（groupId = null, isSystem = true）
 * - グループ専用カテゴリ（groupIdあり）
 */

import type { NewCategory } from "../../../types/schema";
import { GROUP_IDS } from "./groups";

// 固定UUID（再現性のため）
export const CATEGORY_IDS = {
	// システム共通 - 支出
	food: "cccccccc-0001-0001-0001-000000000001",
	transport: "cccccccc-0001-0001-0001-000000000002",
	housing: "cccccccc-0001-0001-0001-000000000003",
	utilities: "cccccccc-0001-0001-0001-000000000004",
	entertainment: "cccccccc-0001-0001-0001-000000000005",
	medical: "cccccccc-0001-0001-0001-000000000006",
	otherExpense: "cccccccc-0001-0001-0001-000000000007",
	// システム共通 - 収入
	salary: "cccccccc-0002-0002-0002-000000000001",
	bonus: "cccccccc-0002-0002-0002-000000000002",
	otherIncome: "cccccccc-0002-0002-0002-000000000003",
	// グループ専用 - 田中家
	kids: "cccccccc-0003-0003-0003-000000000001",
	pet: "cccccccc-0003-0003-0003-000000000002",
	// グループ専用 - シェアハウスA
	sharedGoods: "cccccccc-0004-0004-0004-000000000001",
	partyFund: "cccccccc-0004-0004-0004-000000000002",
} as const;

// システム共通カテゴリ
export const seedSystemCategories: NewCategory[] = [
	// 支出カテゴリ
	{
		id: CATEGORY_IDS.food,
		groupId: null,
		name: "食費",
		type: "expense",
		icon: "restaurant",
		sortOrder: 1,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.transport,
		groupId: null,
		name: "交通費",
		type: "expense",
		icon: "train",
		sortOrder: 2,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.housing,
		groupId: null,
		name: "住居費",
		type: "expense",
		icon: "home",
		sortOrder: 3,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.utilities,
		groupId: null,
		name: "水道光熱費",
		type: "expense",
		icon: "bolt",
		sortOrder: 4,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.entertainment,
		groupId: null,
		name: "娯楽費",
		type: "expense",
		icon: "movie",
		sortOrder: 5,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.medical,
		groupId: null,
		name: "医療費",
		type: "expense",
		icon: "medical_services",
		sortOrder: 6,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.otherExpense,
		groupId: null,
		name: "その他支出",
		type: "expense",
		icon: "more_horiz",
		sortOrder: 99,
		isSystem: true,
	},
	// 収入カテゴリ
	{
		id: CATEGORY_IDS.salary,
		groupId: null,
		name: "給与",
		type: "income",
		icon: "payments",
		sortOrder: 1,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.bonus,
		groupId: null,
		name: "賞与",
		type: "income",
		icon: "card_giftcard",
		sortOrder: 2,
		isSystem: true,
	},
	{
		id: CATEGORY_IDS.otherIncome,
		groupId: null,
		name: "その他収入",
		type: "income",
		icon: "more_horiz",
		sortOrder: 99,
		isSystem: true,
	},
];

// グループ専用カテゴリ
export const seedGroupCategories: NewCategory[] = [
	// 田中家のカスタムカテゴリ
	{
		id: CATEGORY_IDS.kids,
		groupId: GROUP_IDS.tanakaFamily,
		name: "子ども費",
		type: "expense",
		icon: "child_care",
		sortOrder: 10,
		isSystem: false,
	},
	{
		id: CATEGORY_IDS.pet,
		groupId: GROUP_IDS.tanakaFamily,
		name: "ペット費",
		type: "expense",
		icon: "pets",
		sortOrder: 11,
		isSystem: false,
	},
	// シェアハウスAのカスタムカテゴリ
	{
		id: CATEGORY_IDS.sharedGoods,
		groupId: GROUP_IDS.shareHouseA,
		name: "共有物品",
		type: "expense",
		icon: "shopping_cart",
		sortOrder: 10,
		isSystem: false,
	},
	{
		id: CATEGORY_IDS.partyFund,
		groupId: GROUP_IDS.shareHouseA,
		name: "パーティー費",
		type: "expense",
		icon: "celebration",
		sortOrder: 11,
		isSystem: false,
	},
];
