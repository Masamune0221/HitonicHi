# ひとにち (Hitonichi)

> 1 日の振り返りを感情ベースで記録できる日記アプリ

## コンセプト

**ひとにち**は、メンタルケアを目的とした日記アプリです。

- 1 日の振り返りを自由に記録
- よかったこと・悪かったことなど、感情ベースで書ける
- **1 日 1 回・過去は編集不可**という思想
- 必要に応じて他人と共有可能（強制ではない）

## 主な機能（MVP）

- ✅ ログイン機能
- ✅ 日付ごとに 1 日 1 件の日記投稿
- ✅ テキスト入力（日記本文）
- ✅ 過去の日記一覧表示
- ✅ 今日の日記が投稿済みかどうかの判定

### 制約ルール

- **1 日 1 回しか保存できない**
- **過去の日記は編集不可**

## 技術スタック

### Backend

- Laravel（API）
- MySQL
- Laravel Sanctum（認証）

### Frontend

- React + Vite
- Tailwind CSS v4
- React Router

### 開発環境

- Docker & Docker Compose

## プロジェクト構造

```
Hitonichi/
├── backend/           # Laravel API
├── frontend/          # React + Vite
├── docker/            # Docker設定
├── docs/              # ドキュメント
└── docker-compose.yml
```

## セットアップ

### 必要な環境

- Docker & Docker Compose
- Node.js 18+ (ローカル開発の場合)
- Composer (ローカル開発の場合)

### 起動手順

1. **リポジトリのクローン**

   ```bash
   git clone <repository-url>
   cd Hitonichi
   ```

2. **Docker コンテナの起動**

   ```bash
   docker-compose up -d
   ```

3. **Laravel のセットアップ**

   ```bash
   # コンテナに入る
   cd backend

   # 依存関係のインストール
   composer install

   # .envファイルのコピー
   cp .env.example .env

   # アプリケーションキーの生成
   php artisan key:generate

   # マイグレーション実行
   php artisan migrate

   # Sanctumのインストール
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   php artisan migrate

   # サーバーの起動
   php artisan serve
   ```

4. **React のセットアップ**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **アクセス**
   - Frontend: http://localhost:5173/login
   - Backend API: http://localhost:8000

## API 仕様

### 認証

#### `POST /api/login`

ログイン

**リクエスト:**

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

#### `POST /api/logout`

ログアウト（要認証）

---

### 日記 API

#### `GET /api/diaries/today`

今日の日記取得・投稿可否判定（要認証）

**レスポンス（未投稿）:**

```json
{
  "date": "2026-01-11",
  "can_post": true,
  "diary": null
}
```

**レスポンス（投稿済み）:**

```json
{
  "date": "2026-01-11",
  "can_post": false,
  "diary": {
    "id": 12,
    "content": "今日は少し疲れた",
    "ai_comment": null
  }
}
```

---

#### `POST /api/diaries`

日記作成（1 日 1 回）（要認証）

**リクエスト:**

```json
{
  "content": "今日は〇〇が大変だった"
}
```

**レスポンス:**

- `201 Created`: 作成成功
- `409 Conflict`: すでに投稿済み

---

#### `GET /api/diaries`

日記一覧取得（要認証）

**クエリパラメータ（任意）:**

- `from`: 開始日（例: 2026-01-01）
- `to`: 終了日（例: 2026-01-31）

**レスポンス:**

```json
[
  {
    "id": 10,
    "date": "2026-01-09",
    "excerpt": "少し落ち込んだ一日"
  },
  {
    "id": 11,
    "date": "2026-01-10",
    "excerpt": "友達と話して楽になった"
  }
]
```

---

#### `GET /api/diaries/{id}`

日記詳細取得（要認証）

**レスポンス:**

```json
{
  "id": 12,
  "date": "2026-01-11",
  "content": "今日は〇〇が大変だった",
  "ai_comment": null,
  "is_public": false
}
```

## デザインガイドライン

### カラーパレット

| 役割                 | 色               | HEX       |
| -------------------- | ---------------- | --------- |
| メイン（文字・ロゴ） | 濃いネイビー     | `#27374D` |
| サブ（補足・UI）     | スモーキーブルー | `#526D82` |
| ボーダー・区切り     | 淡いブルーグレー | `#9DB2BF` |
| 背景                 | ペールブルー     | `#DDE6ED` |

### フォント

**Zen Kaku Gothic New**

- 基本ウェイト: 400
- 見出し: 500
- 強調（ロゴなど）: 700（多用しない）

### UI 思想

- 余計な情報を出さない
- 入力体験を最優先
- メンタルケア目的のため
  - 色は落ち着いたトーン
  - 否定的表現を避ける

## データベース設計

### users テーブル

- id (PK)
- name
- email (unique)
- password
- timestamps

### diaries テーブル

- id (PK)
- user_id (FK → users.id)
- diary_date (date) **UNIQUE with user_id**
- content (text)
- is_public (boolean, default: false)
- ai_comment (text, nullable)
- timestamps

**重要な制約:**

```sql
UNIQUE(user_id, diary_date) -- 1ユーザー1日1件を保証
```

## 開発コマンド

### Backend (Laravel)

```bash
# マイグレーション
php artisan migrate

# マイグレーションのロールバック
php artisan migrate:rollback

# テスト実行
php artisan test

# キャッシュクリア
php artisan cache:clear
php artisan config:clear
```

### Frontend (React)

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# リント
npm run lint
```

## 今後の拡張要素

- [ ] Databricks AI との連携（日記への感想表示）
- [ ] 日記の公開・非公開設定 UI
- [ ] 他ユーザーの日記閲覧機能
- [ ] モバイルアプリ化

## ライセンス

MIT License

## 貢献

プルリクエストを歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

**作成日:** 2026 年 1 月 11 日
