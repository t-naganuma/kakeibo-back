/**
 * Seed Data: Groups
 *
 * テスト用グループデータ
 */

import type { NewGroup } from "../../../types/schema";
import { USER_IDS } from "./users";

// 固定UUID（再現性のため）
export const GROUP_IDS = {
	tanakaFamily: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
	shareHouseA: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
} as const;

// グループデータ
export const seedGroups: NewGroup[] = [
	{
		id: GROUP_IDS.tanakaFamily,
		name: "田中家",
		ownerId: USER_IDS.tanakaT,
	},
	{
		id: GROUP_IDS.shareHouseA,
		name: "シェアハウスA",
		ownerId: USER_IDS.yamadaI,
	},
];

// ユーザーとグループの紐付け（ユーザー更新用）
export const userGroupAssignments: { userId: string; groupId: string }[] = [
	{ userId: USER_IDS.tanakaT, groupId: GROUP_IDS.tanakaFamily },
	{ userId: USER_IDS.tanakaH, groupId: GROUP_IDS.tanakaFamily },
	{ userId: USER_IDS.yamadaI, groupId: GROUP_IDS.shareHouseA },
	{ userId: USER_IDS.satoJ, groupId: GROUP_IDS.shareHouseA },
];
