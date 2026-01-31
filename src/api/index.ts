/**
 * Hono API Application
 *
 * APIアプリケーションのエントリーポイント
 */

import { Hono } from "hono";
import categoriesRoutes from "./routes/categories";

const app = new Hono();

// ヘルスチェック
app.get("/health", (c) => c.json({ status: "ok" }));

// ルート登録
app.route("/api/categories", categoriesRoutes);

export default app;
