
<p align="center">
<img width="300" height="300" alt="hitonichi_icon" src="https://github.com/Masamune0221/HitonicHi/blob/dev/frontend/public/icon.png">
</p>

# ひとにち (Hitonichi)

> 1日の振り返りを感情ベースで記録できる日記アプリ

## コンセプト

**ひとにち**は、メンタルケアを目的とした日記アプリです。

- 1日の振り返りを自由に記録
- よかったこと・悪かったことなど、感情ベースで書ける
- **1日1回・過去は編集不可**という思想

## 主な機能（MVP）

- ✅ **ユーザー名によるログイン機能**
- ✅ 1日1件の日記投稿（日付ベース）
- ✅ テキスト投稿（Markdown非対応・プレーンテキスト）
- ✅ 過去の日記一覧表示（フィルタリング対応）
- ✅ 今日の日記ステータス確認（投稿済み/未投稿）

### 制約ルール

1. **1日1回しか保存できない**（その日の感情を確定させる）
2. **過去の日記は編集不可**（記録としての真正性を保つ）

## 技術スタック

### Backend

- **Framework**: Laravel 12.x
- **Language**: PHP 8.2+
- **Database**: PostgreSQL 18
- **Environment**: Docker (Compose)

### Frontend

- **Framework**: React 19 + Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Routing**: React Router 7
- **State/Form**: React Hook Form + Zod
- **UI Components**: Radix UI Primitives, Sonner (Toast)

### インフラ・デプロイ

- **Backend API**: Google Cloud Run
- **Frontend**: Firebase Hosting
- **Database**: Google Cloud SQL (PostgreSQL) , Supabase

## プロジェクト構造

```
Hitonichi/
├── backend/           # Laravel API (Root)
│   ├── app/           # Application Logic
│   ├── database/      # Migrations & Seeds
│   └── tests/         # Feature/Unit Tests
├── frontend/          # React App (Root)
│   ├── src/           # Components, Pages, Hooks
│   └── public/        # Static Assets
├── docker-compose.yml # Local Development Environment
└── README.md          # This file
```

## セットアップ (ローカル開発)

### 必須要件

- Docker & Docker Compose
- (Optional) Node.js 22+, PHP 8.2+, Composer

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

   _PostgreSQL 18 コンテナが起動します_

3. **Backend (Laravel) セットアップ**

   ```bash
   # コンテナ内に入る (推奨) またはローカルで実行
   cd backend

   # 依存関係インストール
   composer install

   # 環境設定
   cp .env.example .env
   php artisan key:generate

   # データベース準備
   php artisan migrate

   # サーバー起動 (Dockerを使用しない場合)
   # php artisan serve
   ```

4. **Frontend (React) セットアップ**

   ```bash
   cd frontend

   # 依存関係インストール
   npm install

   # 開発サーバー起動
   npm run dev
   ```

5. **アクセス**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`

## API 仕様

### 認証 (Authentication)

#### `POST /api/register`

ユーザー登録

**リクエスト:**

```json
{
  "name": "username01",
  "email": "user@example.com",
  "password": "password123!",
  "password_confirmation": "password123!"
}
```

#### `POST /api/login`

ログイン

**リクエスト:**

```json
{
  "name": "username01",
  "password": "password123!"
}
```

_Note: メールアドレスではなくユーザー名でログインします。_

#### `POST /api/logout`

ログアウト（要認証: `Bearer <token>`）

### 日記 (Diaries)

#### `GET /api/diaries/today`

今日の日記状態確認

**レスポンス:**

```json
{
  "date": "2026-02-02",
  "can_post": true,
  "diary": null
}
```

#### `POST /api/diaries`

日記作成（1日1回制限）

**リクエスト:**

```json
{ "content": "今日はとても良い日だった。" }
```

#### `GET /api/diaries`

日記一覧取得

**クエリパラメータ:**

- `from`: `YYYY-MM-DD`
- `to`: `YYYY-MM-DD`

## デザインシステム

**コンセプトカラー**:  
「夜明け前の静けさ」や「落ち着いた内省」をイメージしたブルーグレー基調。

| Role           | Color      | Hex       |
| -------------- | ---------- | --------- |
| **Primary**    | Deep Navy  | `#27374D` |
| **Secondary**  | Smoky Blue | `#526D82` |
| **Accent**     | Blue Grey  | `#9DB2BF` |
| **Background** | Pale Blue  | `#DDE6ED` |

**フォント**: `Zen Kaku Gothic New` (Google Fonts)

#### 今後の機能

- [x] 投稿をAIに共有し、AIに日記の感想を言ってもらう

## ライセンス

MIT License
