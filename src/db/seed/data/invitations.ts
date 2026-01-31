/**
 * Seed Data: Invitations
 *
 * テスト用招待データ
 * - 有効な招待（未使用、有効期限内）
 * - 使用済みの招待
 * - 期限切れの招待
 */

import type { NewInvitation } from "../../../types/schema";
import { GROUP_IDS } from "./groups";
import { USER_IDS } from "./users";

// 固定UUID（再現性のため）
export const INVITATION_IDS = {
	active: "eeeeeeee-0001-0001-0001-000000000001",
	used: "eeeeeeee-0001-0001-0001-000000000002",
	expired: "eeeeeeee-0001-0001-0001-000000000003",
} as const;

// 日付ヘルパー
const now = new Date();
const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

// 招待データ
export const seedInvitations: NewInvitation[] = [
	// 有効な招待（田中家への招待）
	{
		id: INVITATION_IDS.active,
		groupId: GROUP_IDS.tanakaFamily,
		code: "TNKF2025",
		createdBy: USER_IDS.tanakaT,
		usedBy: null,
		usedAt: null,
		expiresAt: sevenDaysLater,
	},
	// 使用済みの招待（シェアハウスAへの招待）
	{
		id: INVITATION_IDS.used,
		groupId: GROUP_IDS.shareHouseA,
		code: "SHSA2024",
		createdBy: USER_IDS.yamadaI,
		usedBy: USER_IDS.satoJ,
		usedAt: threeDaysAgo,
		expiresAt: sevenDaysLater,
	},
	// 期限切れの招待（田中家への招待）
	{
		id: INVITATION_IDS.expired,
		groupId: GROUP_IDS.tanakaFamily,
		code: "OLDCODE1",
		createdBy: USER_IDS.tanakaT,
		usedBy: null,
		usedAt: null,
		expiresAt: oneDayAgo,
	},
];
