# AGENTS.md

このリポジトリでコードを扱う AI エージェント向けのガイド（正本）。Claude Code は `CLAUDE.md` からここを参照する。`@AGENTS.md` とコンテキストに含めれば、Claude はこのファイルを参照できる。

## プロジェクト概要

家族やルームメイトで収支を共有できる家計簿 Web アプリケーションのバックエンド。

## 言語・コミュニケーション

- **すべての回答は日本語で行うこと**
- コードの変更が 200 行を超える可能性がある場合は、事前にユーザーに確認すること
- 大きい変更を加える場合は、まず計画を立ててユーザーに提案すること

### コミュニケーションスタイル

- コードの変更を行う際は、その理由と学習ポイントを説明すること
- 技術的な決定の背景を詳しく説明すること
- 新しい技術やパターンを導入する際は、その目的とメリットを明記すること
- エラーや問題が発生した場合は、原因と解決策を分かりやすく説明すること

## 技術スタック

- **言語**: TypeScript 5.9
- **フレームワーク**: Hono (Web framework)
- **データベース**: PostgreSQL 16
- **ORM**: Drizzle ORM v0.45.1
- **インフラ**: AWS CDK v2
- **テスト**: Jest + ts-jest
- **リンター**: Biome
- **パッケージマネージャー**: pnpm

## 必須開発コマンド

```bash
# ビルド
pnpm build

# Watch mode
pnpm watch

# テスト実行
pnpm test

# コードチェック (Biome)
pnpm check

# データベース関連
pnpm db:generate     # Drizzleマイグレーションファイル生成
pnpm db:migrate      # マイグレーション実行
pnpm db:push         # スキーマを直接DBにプッシュ
pnpm db:studio       # Drizzle Studioでデータベースを管理

# CDK
pnpm cdk deploy      # AWSへのデプロイ
pnpm cdk diff        # 差分確認
pnpm cdk synth       # CloudFormationテンプレート生成
```

## データベース構造

### スキーマファイルの場所

- スキーマ定義: `src/db/schema/*.ts`
- リレーション定義: `src/db/relations.ts`
- DB 接続: `src/db/index.ts`

### テーブル構成

- `users` - ユーザー情報 (Cognito 認証と連携)
- `groups` - グループ情報 (家族やルームメイト単位)
- `categories` - カテゴリー情報 (収入・支出の分類、システム共通 or グループ専用)
- `budgets` - 予算情報 (月次予算管理、デフォルト予算対応)
- `invitations` - グループ招待情報 (8 文字コード、7 日間有効)
- `transactions` - 取引情報
- `transaction_items` - 取引明細情報

詳細は `docs/table_spec.md` を参照。

### スキーマ変更の流れ

1. `src/db/schema/*.ts` でスキーマを定義・変更
2. `pnpm db:generate` でマイグレーションファイルを生成
3. `pnpm db:migrate` でマイグレーションを実行
4. 必要に応じて `src/db/relations.ts` でリレーションを更新

## アーキテクチャの重要ポイント

### Drizzle ORM パターン

- Drizzle ORM を使用した type-safe なデータベースアクセス
- スキーマは個別ファイル (`src/db/schema/*.ts`) で管理し、`src/db/schema/index.ts` で集約
- リレーションは `src/db/relations.ts` で一元管理
- データベース接続は `src/db/index.ts` の `db` と `pool` をエクスポート
- 環境変数 `DATABASE_URL` で接続文字列を管理

### AWS CDK 構成

- CDK スタック定義: `lib/kakeibo-back-stack.ts`
- Lambda 関数: `lambda/` ディレクトリ (現在はほぼ空)
- エントリーポイント: `bin/kakeibo-back.ts`

### 認証

- AWS Cognito を使用
- `users.cognito_sub` で Cognito Subject ID を管理
- 認証済みユーザーのみが API にアクセス可能

### カテゴリー設計の特徴

- システム共通カテゴリ (`group_id = NULL`, `is_system = true`)
- グループ専用カスタムカテゴリ (`group_id` が設定されている)
- 収入/支出タイプ (`type = 'income' | 'expense'`)
- 表示順制御 (`sort_order`)

### 予算管理の特徴

- グループ単位で月次予算を設定
- 1 グループ内で同じ `(year, month)` の組み合わせは 1 つのみ

## 開発ポリシー

### コーディング規約

- 一貫したコードスタイルを保つこと (Biome の設定に従う)
- **TypeScript の `any` 型の使用は禁止** (型安全性を確保するため、具体的な型や `unknown` を使用すること)
- **自動生成されたコードを手動で変更しないこと** (マイグレーションファイルなど、再生成時に上書きされるため)
- env ファイルの参照・変更は行わず、`process.env` を通じてアクセスすること
- 詳細は `docs/development-policy.md` を参照

### ブランチ戦略

- `main`: プロダクション環境
- `develop`: 開発の大元
- `feature/*`: 機能開発・変更 (`feature/${チケット番号}`)
- `hotfix/*`: main への即時修正
- すべてプルリクエスト経由でマージ

## ローカル開発環境

### 前提条件

- Node.js 18 以上
- pnpm
- Docker & Docker Compose

### セットアップ

```bash
# 依存パッケージのインストール
pnpm install

# Docker Composeでローカル環境を起動
docker-compose up -d

# マイグレーション生成と実行
pnpm db:generate
pnpm db:migrate
```

### データベース接続情報 (ローカル)

Docker Compose で起動される PostgreSQL:

- Host: localhost
- Port: 5432
- User: dev
- Password: devpassword
- Database: household_budget

## 注意事項

### 環境変数

- `DATABASE_URL`: PostgreSQL 接続文字列 (必須)
- 本番環境では AWS Secrets Manager などで管理

### セキュリティ

- env ファイルをコミットしないこと
- 機密情報は環境変数経由でアクセス

### テスト

- テストファイルは `test/` ディレクトリに配置
- `*.test.ts` のファイル名パターンで Jest が検出
- AWS CDK のテストヘルパー (`jest-autoclean`) を使用
