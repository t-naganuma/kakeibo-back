/**
 * Database Seed Script
 *
 * テスト用データをデータベースに投入するスクリプト
 *
 * 実行方法: pnpm db:seed
 *
 * 注意:
 * - 本番環境（NODE_ENV=production）では実行を拒否
 * - 実行前に全データをクリアするため、既存データは消える
 */

import { eq } from "drizzle-orm";
import { db, pool } from "../index";
import {
	budgets,
	categories,
	groups,
	invitations,
	transactionItems,
	transactions,
	users,
} from "../schema";
import { seedBudgets } from "./data/budgets";
import { seedGroupCategories, seedSystemCategories } from "./data/categories";
import { seedGroups, userGroupAssignments } from "./data/groups";
import { seedInvitations } from "./data/invitations";
import { seedTransactionItems, seedTransactions } from "./data/transactions";
import { seedUsers } from "./data/users";

async function clearAllData(): Promise<void> {
	console.log("Clearing existing data...");

	// 外部キー制約を考慮して逆順で削除
	await db.delete(transactionItems);
	await db.delete(transactions);
	await db.delete(invitations);
	await db.delete(budgets);
	await db.delete(categories);
	await db.delete(groups);
	await db.delete(users);

	console.log("All data cleared.");
}

async function seedDatabase(): Promise<void> {
	console.log("\n=== Starting Database Seed ===\n");

	// 1. 既存データのクリア
	await clearAllData();

	// 2. ユーザー挿入（groupIdなし）
	console.log("Inserting users...");
	await db.insert(users).values(seedUsers);
	console.log(`  Inserted ${seedUsers.length} users.`);

	// 3. グループ挿入
	console.log("Inserting groups...");
	await db.insert(groups).values(seedGroups);
	console.log(`  Inserted ${seedGroups.length} groups.`);

	// 4. ユーザーのgroupId更新
	console.log("Updating user group assignments...");
	for (const assignment of userGroupAssignments) {
		await db
			.update(users)
			.set({ groupId: assignment.groupId })
			.where(eq(users.id, assignment.userId));
	}
	console.log(
		`  Updated ${userGroupAssignments.length} user group assignments.`,
	);

	// 5. システム共通カテゴリ挿入
	console.log("Inserting system categories...");
	await db.insert(categories).values(seedSystemCategories);
	console.log(`  Inserted ${seedSystemCategories.length} system categories.`);

	// 6. グループ専用カテゴリ挿入
	console.log("Inserting group categories...");
	await db.insert(categories).values(seedGroupCategories);
	console.log(`  Inserted ${seedGroupCategories.length} group categories.`);

	// 7. 予算挿入
	console.log("Inserting budgets...");
	await db.insert(budgets).values(seedBudgets);
	console.log(`  Inserted ${seedBudgets.length} budgets.`);

	// 8. 招待挿入
	console.log("Inserting invitations...");
	await db.insert(invitations).values(seedInvitations);
	console.log(`  Inserted ${seedInvitations.length} invitations.`);

	// 9. 取引挿入
	console.log("Inserting transactions...");
	await db.insert(transactions).values(seedTransactions);
	console.log(`  Inserted ${seedTransactions.length} transactions.`);

	// 10. 取引明細挿入
	console.log("Inserting transaction items...");
	await db.insert(transactionItems).values(seedTransactionItems);
	console.log(`  Inserted ${seedTransactionItems.length} transaction items.`);

	console.log("\n=== Database Seed Completed ===\n");
}

async function main(): Promise<void> {
	// 本番環境チェック
	if (process.env.NODE_ENV === "production") {
		console.error("ERROR: Cannot run seed in production environment!");
		process.exit(1);
	}

	try {
		await seedDatabase();
	} catch (error) {
		console.error("Seed failed:", error);
		process.exit(1);
	} finally {
		await pool.end();
	}
}

main();
