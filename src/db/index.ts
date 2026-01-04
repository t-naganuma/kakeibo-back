/**
 * Database Connection
 *
 * DrizzleとPostgreSQLの接続設定
 */

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// 環境変数からデータベース接続情報を取得
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// PostgreSQLコネクションプールを作成
export const pool = new Pool({
  connectionString,
});

// Drizzleインスタンスを作成
export const db = drizzle(pool);
