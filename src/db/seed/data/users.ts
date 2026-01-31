/**
 * Seed Data: Users
 *
 * テスト用ユーザーデータ
 */

import type { NewUser } from "../../../types/schema";

// 固定UUID（再現性のため）
export const USER_IDS = {
	tanakaT: "11111111-1111-1111-1111-111111111111",
	tanakaH: "22222222-2222-2222-2222-222222222222",
	yamadaI: "33333333-3333-3333-3333-333333333333",
	satoJ: "44444444-4444-4444-4444-444444444444",
} as const;

// ユーザーデータ（初期挿入時はgroupIdなし）
export const seedUsers: NewUser[] = [
	{
		id: USER_IDS.tanakaT,
		cognitoSub: "cognito-sub-tanaka-taro-001",
		email: "tanaka.taro@example.com",
		displayName: "田中太郎",
		groupId: null,
	},
	{
		id: USER_IDS.tanakaH,
		cognitoSub: "cognito-sub-tanaka-hanako-002",
		email: "tanaka.hanako@example.com",
		displayName: "田中花子",
		groupId: null,
	},
	{
		id: USER_IDS.yamadaI,
		cognitoSub: "cognito-sub-yamada-ichiro-003",
		email: "yamada.ichiro@example.com",
		displayName: "山田一郎",
		groupId: null,
	},
	{
		id: USER_IDS.satoJ,
		cognitoSub: "cognito-sub-sato-jiro-004",
		email: "sato.jiro@example.com",
		displayName: "佐藤次郎",
		groupId: null,
	},
];
