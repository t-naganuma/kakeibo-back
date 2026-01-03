/**
 * Database Relations
 *
 * Drizzle ORMのリレーション定義
 */

import { relations } from "drizzle-orm";
import { budgets } from "./schema/budgets";
import { categories } from "./schema/categories";
import { groups } from "./schema/groups";
import { invitations } from "./schema/invitations";
import { transactionItems } from "./schema/transaction-items";
import { transactions } from "./schema/transactions";
import { users } from "./schema/users";

// Users Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  group: one(groups, {
    fields: [users.groupId],
    references: [groups.id],
  }),
  ownedGroup: one(groups, {
    fields: [users.id],
    references: [groups.ownerId],
  }),
  createdInvitations: many(invitations, {
    relationName: "invitationCreator",
  }),
  usedInvitations: many(invitations, {
    relationName: "invitationUser",
  }),
  createdTransactions: many(transactions),
}));

// Groups Relations
export const groupsRelations = relations(groups, ({ one, many }) => ({
  owner: one(users, {
    fields: [groups.ownerId],
    references: [users.id],
  }),
  members: many(users),
  categories: many(categories),
  budgets: many(budgets),
  invitations: many(invitations),
  transactions: many(transactions),
}));

// Categories Relations
export const categoriesRelations = relations(categories, ({ one, many }) => ({
  group: one(groups, {
    fields: [categories.groupId],
    references: [groups.id],
  }),
  transactionItems: many(transactionItems),
}));

// Budgets Relations
export const budgetsRelations = relations(budgets, ({ one }) => ({
  group: one(groups, {
    fields: [budgets.groupId],
    references: [groups.id],
  }),
}));

// Invitations Relations
export const invitationsRelations = relations(invitations, ({ one }) => ({
  group: one(groups, {
    fields: [invitations.groupId],
    references: [groups.id],
  }),
  creator: one(users, {
    fields: [invitations.createdBy],
    references: [users.id],
    relationName: "invitationCreator",
  }),
  user: one(users, {
    fields: [invitations.usedBy],
    references: [users.id],
    relationName: "invitationUser",
  }),
}));

// Transactions Relations
export const transactionsRelations = relations(
  transactions,
  ({ one, many }) => ({
    group: one(groups, {
      fields: [transactions.groupId],
      references: [groups.id],
    }),
    creator: one(users, {
      fields: [transactions.createdBy],
      references: [users.id],
    }),
    items: many(transactionItems),
  })
);

// Transaction Items Relations
export const transactionItemsRelations = relations(
  transactionItems,
  ({ one }) => ({
    transaction: one(transactions, {
      fields: [transactionItems.transactionId],
      references: [transactions.id],
    }),
    category: one(categories, {
      fields: [transactionItems.categoryId],
      references: [categories.id],
    }),
  })
);
