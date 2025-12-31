# テーブル定義書

## users

ユーザー情報を管理するテーブル。

| カラム名 | 型 | 制約 | 説明 |
|----------|-----|------|------|
| id | UUID | PK | 主キー |
| cognito_sub | VARCHAR(255) | UNIQUE, NOT NULL | Cognito Subject ID |
| email | VARCHAR(255) | NOT NULL | メールアドレス |
| display_name | VARCHAR(100) | NOT NULL | 表示名 |
| group_id | UUID | FK → groups.id, NULL | 所属グループ |
| created_at | TIMESTAMP | NOT NULL | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | 更新日時 |

### インデックス

- PRIMARY KEY: `id`
- UNIQUE INDEX: `cognito_sub`
- FOREIGN KEY: `group_id` → `groups(id)`

### 備考

- ユーザーはグループに所属することができる(任意)
- cognito_subはAWS Cognitoの一意識別子
- group_idがNULLの場合、そのユーザーはどのグループにも所属していない

---

## groups

グループ情報を管理するテーブル。家族やルームメイトなどで収支を共有するためのグループ。

| カラム名 | 型 | 制約 | 説明 |
|----------|-----|------|------|
| id | UUID | PK | 主キー |
| name | VARCHAR(100) | NOT NULL | グループ名 |
| owner_id | UUID | FK → users.id, NOT NULL | オーナー |
| created_at | TIMESTAMP | NOT NULL | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | 更新日時 |

### インデックス

- PRIMARY KEY: `id`
- FOREIGN KEY: `owner_id` → `users(id)`

### 備考

- 各グループには必ずオーナー(作成者)が存在する
- オーナーはグループの管理権限を持つ
- グループには複数のユーザーが所属できる(users.group_idで参照)

---

## categories

カテゴリー情報を管理するテーブル。収入・支出を分類するためのカテゴリー。

| カラム名 | 型 | 制約 | 説明 |
|----------|-----|------|------|
| id | UUID | PK | 主キー |
| group_id | UUID | FK → groups.id, NULL | 所属グループ（null=システム共通） |
| name | VARCHAR(50) | NOT NULL | カテゴリ名 |
| type | VARCHAR(10) | NOT NULL | income / expense |
| icon | VARCHAR(50) | NULL | 絵文字 or アイコン名 |
| sort_order | INT | DEFAULT 0 | 表示順 |
| is_system | BOOLEAN | DEFAULT false | システム定義か |
| created_at | TIMESTAMP | NOT NULL | 作成日時 |

### インデックス

- PRIMARY KEY: `id`
- FOREIGN KEY: `group_id` → `groups(id)`
- INDEX: `(group_id, type, sort_order)` (カテゴリ一覧取得用)

### 備考

- `group_id`がNULLの場合、システム共通カテゴリ(全ユーザーが利用可能)
- `group_id`が設定されている場合、そのグループ専用のカスタムカテゴリ
- `is_system=true`のカテゴリは削除・編集不可
- `type`は'income'(収入)または'expense'(支出)のいずれか
- `sort_order`で表示順を制御(昇順)
- `icon`にはUnicode絵文字やアイコンライブラリの識別子を格納

---

## budgets

予算情報を管理するテーブル。グループ単位で月次予算を設定する。

| カラム名 | 型 | 制約 | 説明 |
|----------|-----|------|------|
| id | UUID | PK | 主キー |
| group_id | UUID | FK → groups.id, NOT NULL | 所属グループ |
| year | INT | NULL | 年（null=デフォルト） |
| month | INT | NULL | 月（null=デフォルト） |
| amount | INT | NOT NULL | 予算額（円） |
| created_at | TIMESTAMP | NOT NULL | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | 更新日時 |

### インデックス

- PRIMARY KEY: `id`
- FOREIGN KEY: `group_id` → `groups(id)`
- UNIQUE INDEX: `(group_id, year, month)` (同一グループ・期間の重複防止)

### 備考

- `year`と`month`が両方NULLの場合、そのグループのデフォルト予算として機能
- デフォルト予算は、特定の年月に予算が設定されていない場合に使用される
- `month`は1〜12の範囲で設定（アプリケーションレベルで検証）
- `amount`は円単位で格納（負の値は許可しない）
- 同一グループ内で同じ年月の組み合わせは一つのみ登録可能

---

## invitations

グループへの招待を管理するテーブル。招待コードを使って他のユーザーをグループに招待する。

| カラム名 | 型 | 制約 | 説明 |
|----------|-----|------|------|
| id | UUID | PK | 主キー |
| group_id | UUID | FK → groups.id, NOT NULL | 対象グループ |
| code | VARCHAR(8) | UNIQUE, NOT NULL | 招待コード |
| created_by | UUID | FK → users.id, NOT NULL | 作成者 |
| used_by | UUID | FK → users.id, NULL | 使用者 |
| used_at | TIMESTAMP | NULL | 使用日時 |
| expires_at | TIMESTAMP | NOT NULL | 有効期限（7日間） |
| created_at | TIMESTAMP | NOT NULL | 作成日時 |

### インデックス

- PRIMARY KEY: `id`
- UNIQUE INDEX: `code` (招待コードの一意性)
- FOREIGN KEY: `group_id` → `groups(id)`
- FOREIGN KEY: `created_by` → `users(id)`
- FOREIGN KEY: `used_by` → `users(id)`
- INDEX: `(group_id, created_at)` (グループ別招待履歴取得用)
- INDEX: `(expires_at)` (期限切れ招待の削除用)

### 備考

- `code`は8文字のランダムな英数字で生成される一意の招待コード
- 招待コードの有効期限は作成から7日間(`expires_at`)
- `used_by`と`used_at`がNULLの場合、まだ使用されていない招待
- 招待コードが使用されると、`used_by`に使用者のユーザーID、`used_at`に使用日時が記録される
- 期限切れ(`expires_at < 現在時刻`)または使用済み(`used_by IS NOT NULL`)の招待は無効
- 同じグループに対して複数の有効な招待を作成可能
- 招待を受けたユーザーは自動的にそのグループの`group_id`が設定される(users.group_id)

