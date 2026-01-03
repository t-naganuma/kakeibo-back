/**
 * Schema Type Definitions
 *
 * Drizzleスキーマから型定義をエクスポート
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
  budgets,
  categories,
  groups,
  invitations,
  transactionItems,
  transactions,
  users,
} from "../db/schema";

// Select Types (データベースから取得する際の型)
export type User = InferSelectModel<typeof users>;
export type Group = InferSelectModel<typeof groups>;
export type Category = InferSelectModel<typeof categories>;
export type Budget = InferSelectModel<typeof budgets>;
export type Invitation = InferSelectModel<typeof invitations>;
export type Transaction = InferSelectModel<typeof transactions>;
export type TransactionItem = InferSelectModel<typeof transactionItems>;

// Insert Types (データベースに挿入する際の型)
export type NewUser = InferInsertModel<typeof users>;
export type NewGroup = InferInsertModel<typeof groups>;
export type NewCategory = InferInsertModel<typeof categories>;
export type NewBudget = InferInsertModel<typeof budgets>;
export type NewInvitation = InferInsertModel<typeof invitations>;
export type NewTransaction = InferInsertModel<typeof transactions>;
export type NewTransactionItem = InferInsertModel<typeof transactionItems>;
