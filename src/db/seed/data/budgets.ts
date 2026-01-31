/**
 * Seed Data: Budgets
 *
 * テスト用予算データ
 * 各グループに対して2025年1月・2月分の予算を設定
 */

import type { NewBudget } from "../../../types/schema";
import { GROUP_IDS } from "./groups";

// 固定UUID（再現性のため）
export const BUDGET_IDS = {
	tanakaFamily202501: "dddddddd-0001-0001-0001-000000000001",
	tanakaFamily202502: "dddddddd-0001-0001-0001-000000000002",
	shareHouseA202501: "dddddddd-0002-0002-0002-000000000001",
	shareHouseA202502: "dddddddd-0002-0002-0002-000000000002",
} as const;

// 予算データ
export const seedBudgets: NewBudget[] = [
	// 田中家の予算
	{
		id: BUDGET_IDS.tanakaFamily202501,
		groupId: GROUP_IDS.tanakaFamily,
		year: 2025,
		month: 1,
		amount: 300000, // 30万円
	},
	{
		id: BUDGET_IDS.tanakaFamily202502,
		groupId: GROUP_IDS.tanakaFamily,
		year: 2025,
		month: 2,
		amount: 320000, // 32万円
	},
	// シェアハウスAの予算
	{
		id: BUDGET_IDS.shareHouseA202501,
		groupId: GROUP_IDS.shareHouseA,
		year: 2025,
		month: 1,
		amount: 150000, // 15万円
	},
	{
		id: BUDGET_IDS.shareHouseA202502,
		groupId: GROUP_IDS.shareHouseA,
		year: 2025,
		month: 2,
		amount: 150000, // 15万円
	},
];
