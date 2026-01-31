/**
 * Seed Data: Transactions & Transaction Items
 *
 * テスト用取引データと取引明細データ
 * 各グループに対して複数の取引を設定
 */

import type { NewTransaction, NewTransactionItem } from "../../../types/schema";
import { CATEGORY_IDS } from "./categories";
import { GROUP_IDS } from "./groups";
import { USER_IDS } from "./users";

// 固定UUID - 取引
export const TRANSACTION_IDS = {
	// 田中家の取引
	tanaka01: "ffffffff-0001-0001-0001-000000000001",
	tanaka02: "ffffffff-0001-0001-0001-000000000002",
	tanaka03: "ffffffff-0001-0001-0001-000000000003",
	tanaka04: "ffffffff-0001-0001-0001-000000000004",
	tanaka05: "ffffffff-0001-0001-0001-000000000005",
	tanaka06: "ffffffff-0001-0001-0001-000000000006",
	tanaka07: "ffffffff-0001-0001-0001-000000000007",
	tanaka08: "ffffffff-0001-0001-0001-000000000008",
	tanaka09: "ffffffff-0001-0001-0001-000000000009",
	tanaka10: "ffffffff-0001-0001-0001-000000000010",
	// シェアハウスAの取引
	share01: "ffffffff-0002-0002-0002-000000000001",
	share02: "ffffffff-0002-0002-0002-000000000002",
	share03: "ffffffff-0002-0002-0002-000000000003",
	share04: "ffffffff-0002-0002-0002-000000000004",
	share05: "ffffffff-0002-0002-0002-000000000005",
	share06: "ffffffff-0002-0002-0002-000000000006",
	share07: "ffffffff-0002-0002-0002-000000000007",
	share08: "ffffffff-0002-0002-0002-000000000008",
	share09: "ffffffff-0002-0002-0002-000000000009",
	share10: "ffffffff-0002-0002-0002-000000000010",
} as const;

// 固定UUID - 取引明細
export const TRANSACTION_ITEM_IDS = {
	// 田中家
	tanaka01_01: "11111111-0001-0001-0001-000000000001",
	tanaka02_01: "11111111-0001-0001-0001-000000000002",
	tanaka02_02: "11111111-0001-0001-0001-000000000003",
	tanaka03_01: "11111111-0001-0001-0001-000000000004",
	tanaka04_01: "11111111-0001-0001-0001-000000000005",
	tanaka05_01: "11111111-0001-0001-0001-000000000006",
	tanaka06_01: "11111111-0001-0001-0001-000000000007",
	tanaka06_02: "11111111-0001-0001-0001-000000000008",
	tanaka07_01: "11111111-0001-0001-0001-000000000009",
	tanaka08_01: "11111111-0001-0001-0001-000000000010",
	tanaka09_01: "11111111-0001-0001-0001-000000000011",
	tanaka09_02: "11111111-0001-0001-0001-000000000012",
	tanaka10_01: "11111111-0001-0001-0001-000000000013",
	// シェアハウスA
	share01_01: "11111111-0002-0002-0002-000000000001",
	share02_01: "11111111-0002-0002-0002-000000000002",
	share03_01: "11111111-0002-0002-0002-000000000003",
	share03_02: "11111111-0002-0002-0002-000000000004",
	share04_01: "11111111-0002-0002-0002-000000000005",
	share05_01: "11111111-0002-0002-0002-000000000006",
	share06_01: "11111111-0002-0002-0002-000000000007",
	share07_01: "11111111-0002-0002-0002-000000000008",
	share07_02: "11111111-0002-0002-0002-000000000009",
	share07_03: "11111111-0002-0002-0002-000000000010",
	share08_01: "11111111-0002-0002-0002-000000000011",
	share09_01: "11111111-0002-0002-0002-000000000012",
	share10_01: "11111111-0002-0002-0002-000000000013",
} as const;

// 田中家の取引データ
export const seedTanakaTransactions: NewTransaction[] = [
	{
		id: TRANSACTION_IDS.tanaka01,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-05"),
		description: "太郎 給与",
		createdBy: USER_IDS.tanakaT,
	},
	{
		id: TRANSACTION_IDS.tanaka02,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-07"),
		description: "週末の買い出し",
		createdBy: USER_IDS.tanakaH,
	},
	{
		id: TRANSACTION_IDS.tanaka03,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-10"),
		description: "電気代",
		createdBy: USER_IDS.tanakaT,
	},
	{
		id: TRANSACTION_IDS.tanaka04,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-12"),
		description: "子どもの習い事",
		createdBy: USER_IDS.tanakaH,
	},
	{
		id: TRANSACTION_IDS.tanaka05,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-15"),
		description: "ペットフード",
		createdBy: USER_IDS.tanakaT,
	},
	{
		id: TRANSACTION_IDS.tanaka06,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-18"),
		description: "家族で外食",
		createdBy: USER_IDS.tanakaH,
	},
	{
		id: TRANSACTION_IDS.tanaka07,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-20"),
		description: "通勤定期券",
		createdBy: USER_IDS.tanakaT,
	},
	{
		id: TRANSACTION_IDS.tanaka08,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-22"),
		description: "病院（風邪）",
		createdBy: USER_IDS.tanakaH,
	},
	{
		id: TRANSACTION_IDS.tanaka09,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-25"),
		description: "花子 パート給与",
		createdBy: USER_IDS.tanakaH,
	},
	{
		id: TRANSACTION_IDS.tanaka10,
		groupId: GROUP_IDS.tanakaFamily,
		transactionDate: new Date("2025-01-28"),
		description: "映画館",
		createdBy: USER_IDS.tanakaT,
	},
];

// シェアハウスAの取引データ
export const seedShareHouseTransactions: NewTransaction[] = [
	{
		id: TRANSACTION_IDS.share01,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-03"),
		description: "山田 給与",
		createdBy: USER_IDS.yamadaI,
	},
	{
		id: TRANSACTION_IDS.share02,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-05"),
		description: "共有の洗剤購入",
		createdBy: USER_IDS.satoJ,
	},
	{
		id: TRANSACTION_IDS.share03,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-08"),
		description: "電気代・水道代",
		createdBy: USER_IDS.yamadaI,
	},
	{
		id: TRANSACTION_IDS.share04,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-10"),
		description: "佐藤 給与",
		createdBy: USER_IDS.satoJ,
	},
	{
		id: TRANSACTION_IDS.share05,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-12"),
		description: "共有トイレットペーパー",
		createdBy: USER_IDS.yamadaI,
	},
	{
		id: TRANSACTION_IDS.share06,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-15"),
		description: "新年会費用",
		createdBy: USER_IDS.satoJ,
	},
	{
		id: TRANSACTION_IDS.share07,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-18"),
		description: "週末の買い出し",
		createdBy: USER_IDS.yamadaI,
	},
	{
		id: TRANSACTION_IDS.share08,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-20"),
		description: "ガス代",
		createdBy: USER_IDS.satoJ,
	},
	{
		id: TRANSACTION_IDS.share09,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-23"),
		description: "通勤交通費",
		createdBy: USER_IDS.yamadaI,
	},
	{
		id: TRANSACTION_IDS.share10,
		groupId: GROUP_IDS.shareHouseA,
		transactionDate: new Date("2025-01-27"),
		description: "映画鑑賞",
		createdBy: USER_IDS.satoJ,
	},
];

// 全取引データ
export const seedTransactions: NewTransaction[] = [
	...seedTanakaTransactions,
	...seedShareHouseTransactions,
];

// 田中家の取引明細データ
export const seedTanakaTransactionItems: NewTransactionItem[] = [
	// 給与（収入）
	{
		id: TRANSACTION_ITEM_IDS.tanaka01_01,
		transactionId: TRANSACTION_IDS.tanaka01,
		categoryId: CATEGORY_IDS.salary,
		amount: 350000,
		memo: "1月分給与",
	},
	// 週末の買い出し
	{
		id: TRANSACTION_ITEM_IDS.tanaka02_01,
		transactionId: TRANSACTION_IDS.tanaka02,
		categoryId: CATEGORY_IDS.food,
		amount: -8500,
		memo: "スーパーで食材",
	},
	{
		id: TRANSACTION_ITEM_IDS.tanaka02_02,
		transactionId: TRANSACTION_IDS.tanaka02,
		categoryId: CATEGORY_IDS.otherExpense,
		amount: -1200,
		memo: "日用品",
	},
	// 電気代
	{
		id: TRANSACTION_ITEM_IDS.tanaka03_01,
		transactionId: TRANSACTION_IDS.tanaka03,
		categoryId: CATEGORY_IDS.utilities,
		amount: -12000,
		memo: "1月分電気代",
	},
	// 子どもの習い事
	{
		id: TRANSACTION_ITEM_IDS.tanaka04_01,
		transactionId: TRANSACTION_IDS.tanaka04,
		categoryId: CATEGORY_IDS.kids,
		amount: -8000,
		memo: "ピアノ教室月謝",
	},
	// ペットフード
	{
		id: TRANSACTION_ITEM_IDS.tanaka05_01,
		transactionId: TRANSACTION_IDS.tanaka05,
		categoryId: CATEGORY_IDS.pet,
		amount: -3500,
		memo: "猫のエサ",
	},
	// 家族で外食
	{
		id: TRANSACTION_ITEM_IDS.tanaka06_01,
		transactionId: TRANSACTION_IDS.tanaka06,
		categoryId: CATEGORY_IDS.food,
		amount: -6000,
		memo: "ファミレス",
	},
	{
		id: TRANSACTION_ITEM_IDS.tanaka06_02,
		transactionId: TRANSACTION_IDS.tanaka06,
		categoryId: CATEGORY_IDS.entertainment,
		amount: -2000,
		memo: "デザート",
	},
	// 通勤定期券
	{
		id: TRANSACTION_ITEM_IDS.tanaka07_01,
		transactionId: TRANSACTION_IDS.tanaka07,
		categoryId: CATEGORY_IDS.transport,
		amount: -15000,
		memo: "1ヶ月定期",
	},
	// 病院
	{
		id: TRANSACTION_ITEM_IDS.tanaka08_01,
		transactionId: TRANSACTION_IDS.tanaka08,
		categoryId: CATEGORY_IDS.medical,
		amount: -3000,
		memo: "診察代と薬代",
	},
	// パート給与（収入）
	{
		id: TRANSACTION_ITEM_IDS.tanaka09_01,
		transactionId: TRANSACTION_IDS.tanaka09,
		categoryId: CATEGORY_IDS.salary,
		amount: 80000,
		memo: "1月分パート",
	},
	{
		id: TRANSACTION_ITEM_IDS.tanaka09_02,
		transactionId: TRANSACTION_IDS.tanaka09,
		categoryId: CATEGORY_IDS.otherIncome,
		amount: 5000,
		memo: "交通費支給",
	},
	// 映画館
	{
		id: TRANSACTION_ITEM_IDS.tanaka10_01,
		transactionId: TRANSACTION_IDS.tanaka10,
		categoryId: CATEGORY_IDS.entertainment,
		amount: -3600,
		memo: "家族4人分",
	},
];

// シェアハウスAの取引明細データ
export const seedShareHouseTransactionItems: NewTransactionItem[] = [
	// 山田 給与（収入）
	{
		id: TRANSACTION_ITEM_IDS.share01_01,
		transactionId: TRANSACTION_IDS.share01,
		categoryId: CATEGORY_IDS.salary,
		amount: 280000,
		memo: "1月分給与",
	},
	// 共有の洗剤購入
	{
		id: TRANSACTION_ITEM_IDS.share02_01,
		transactionId: TRANSACTION_IDS.share02,
		categoryId: CATEGORY_IDS.sharedGoods,
		amount: -800,
		memo: "洗濯洗剤",
	},
	// 電気代・水道代
	{
		id: TRANSACTION_ITEM_IDS.share03_01,
		transactionId: TRANSACTION_IDS.share03,
		categoryId: CATEGORY_IDS.utilities,
		amount: -8000,
		memo: "電気代",
	},
	{
		id: TRANSACTION_ITEM_IDS.share03_02,
		transactionId: TRANSACTION_IDS.share03,
		categoryId: CATEGORY_IDS.utilities,
		amount: -4000,
		memo: "水道代",
	},
	// 佐藤 給与（収入）
	{
		id: TRANSACTION_ITEM_IDS.share04_01,
		transactionId: TRANSACTION_IDS.share04,
		categoryId: CATEGORY_IDS.salary,
		amount: 250000,
		memo: "1月分給与",
	},
	// 共有トイレットペーパー
	{
		id: TRANSACTION_ITEM_IDS.share05_01,
		transactionId: TRANSACTION_IDS.share05,
		categoryId: CATEGORY_IDS.sharedGoods,
		amount: -1200,
		memo: "12ロール",
	},
	// 新年会費用
	{
		id: TRANSACTION_ITEM_IDS.share06_01,
		transactionId: TRANSACTION_IDS.share06,
		categoryId: CATEGORY_IDS.partyFund,
		amount: -15000,
		memo: "居酒屋代",
	},
	// 週末の買い出し
	{
		id: TRANSACTION_ITEM_IDS.share07_01,
		transactionId: TRANSACTION_IDS.share07,
		categoryId: CATEGORY_IDS.food,
		amount: -3500,
		memo: "野菜・肉",
	},
	{
		id: TRANSACTION_ITEM_IDS.share07_02,
		transactionId: TRANSACTION_IDS.share07,
		categoryId: CATEGORY_IDS.food,
		amount: -1500,
		memo: "飲み物",
	},
	{
		id: TRANSACTION_ITEM_IDS.share07_03,
		transactionId: TRANSACTION_IDS.share07,
		categoryId: CATEGORY_IDS.sharedGoods,
		amount: -500,
		memo: "ゴミ袋",
	},
	// ガス代
	{
		id: TRANSACTION_ITEM_IDS.share08_01,
		transactionId: TRANSACTION_IDS.share08,
		categoryId: CATEGORY_IDS.utilities,
		amount: -6000,
		memo: "1月分ガス代",
	},
	// 通勤交通費
	{
		id: TRANSACTION_ITEM_IDS.share09_01,
		transactionId: TRANSACTION_IDS.share09,
		categoryId: CATEGORY_IDS.transport,
		amount: -5000,
		memo: "Suicaチャージ",
	},
	// 映画鑑賞
	{
		id: TRANSACTION_ITEM_IDS.share10_01,
		transactionId: TRANSACTION_IDS.share10,
		categoryId: CATEGORY_IDS.entertainment,
		amount: -1800,
		memo: "1人分",
	},
];

// 全取引明細データ
export const seedTransactionItems: NewTransactionItem[] = [
	...seedTanakaTransactionItems,
	...seedShareHouseTransactionItems,
];
