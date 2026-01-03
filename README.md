# 家計簿アプリ (バックエンド)

家族やルームメイトで収支を共有できる家計簿Webアプリケーションのバックエンドです。

## 技術スタック

- **フレームワーク**: Hono
- **データベース**: PostgreSQL 16
- **ORM**: Drizzle ORM v0.45.1
- **言語**: TypeScript
- **テスト**: Jest
- **インフラ**: AWS CDK
- **CI/CD**: GitHub Actions (予定)

## データベーススキーマ

以下のテーブルが定義されています：

- `users` - ユーザー情報
- `groups` - グループ情報（家族やルームメイトの単位）
- `categories` - カテゴリー情報（収入・支出の分類）
- `budgets` - 予算情報（月次予算の管理）
- `invitations` - グループ招待情報
- `transactions` - 取引情報
- `transaction_items` - 取引明細情報

詳細は [docs/table_spec.md](docs/table_spec.md) を参照してください。

## セットアップ

### 前提条件

- Node.js 18以上
- pnpm
- Docker & Docker Compose（ローカル開発用）
- PostgreSQL 16（ローカル環境の場合）

### インストール

```bash
# 依存パッケージのインストール
pnpm install
```

### ローカル開発環境

```bash
# Docker Composeでローカル環境を起動
docker-compose up -d

# マイグレーションの生成
pnpm db:generate

# マイグレーションの実行
pnpm db:migrate
```

## 開発コマンド

```bash
# TypeScriptのビルド
pnpm build

# TypeScriptのwatch mode
pnpm watch

# テスト実行
pnpm test

# コードチェック（Biome）
pnpm check

# CDKコマンド
pnpm cdk deploy  # AWSへのデプロイ
pnpm cdk diff    # 現在の状態との差分確認
pnpm cdk synth   # CloudFormationテンプレート生成
```

## ディレクトリ構成

```
kakeibo-back/
├── bin/                    # CDKアプリのエントリーポイント
├── lib/                    # CDKスタック定義
├── lambda/                 # Lambda関数のハンドラー
├── src/
│   ├── db/                # データベース関連
│   │   ├── schema/        # Drizzleスキーマ定義
│   │   ├── relations.ts   # リレーション定義
│   │   └── index.ts       # DB接続設定
│   └── types/             # 型定義
│       └── schema.ts      # スキーマ型定義
├── test/                  # テストファイル
├── docs/                  # ドキュメント
├── drizzle.config.ts      # Drizzle設定
├── docker-compose.yml     # ローカル環境設定
└── package.json
```

## 開発ポリシー

- コーディング規約やブランチ戦略については [docs/development-policy.md](docs/development-policy.md) を参照
- コードレビュー基準については [docs/review-policy.md](docs/review-policy.md) を参照

## ライセンス

Private Project

