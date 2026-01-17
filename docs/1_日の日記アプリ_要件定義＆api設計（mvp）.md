# ひとに血（NitonicHi） 要件定義 & API 設計（MVP）

## コンセプト

**アプリ名：ひとにち（NitonicHi）**

- **1 日の振り返りを感情ベースで記録できる日記アプリ**
- よかったこと・悪かったことなど、自由に書ける
- メンタルケア目的
- 必要に応じて他人と共有できる（強制ではない）
- **1 日 1 回・過去は編集不可**という思想

---

## 想定ユーザー

- 日本に住んでいるユーザー
- 性別・年齢不問
- メンタルケア・自己振り返りを目的とする人
- 日記が続かない人

---

## 機能要件

### 必須（MVP）

- ログイン機能
- 日付ごとに 1 日 1 件の日記投稿
- テキスト入力（日記本文）
- 過去の日記一覧表示
- 今日の日記が投稿済みかどうかの判定

### 制約ルール

- 1 日 1 回しか保存できない
- 過去の日記は編集不可

### あると良い（拡張）

- Databricks AI と連携した日記への感想表示
- 公開／非公開設定
- 他ユーザーの日記閲覧（匿名 or フォロー制）

---

## フォント設計（ひとにち）

### 採用フォント

**Zen Kaku Gothic New（Google Fonts）**

- 日本語表示に強い
- 角ゴシックだが硬すぎない
- 感情を煽らず、静かな印象
- メンタルケア用途と相性が良い

👉 ロゴ・本文・UI すべて共通で使用する

---

### Google Fonts 読み込み例

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

---

### Tailwind CSS 設定例（フォント）

```css
// tailwind.config.js
/* フォント定義 */
@font-face {
  font-family: "Zen Kaku Gothic New";
  src: url("/fonts/ZenKakuGothicNew-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Zen Kaku Gothic New";
  src: url("/fonts/ZenKakuGothicNew-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Zen Kaku Gothic New";
  src: url("/fonts/ZenKakuGothicNew-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}

:root {
  font-family: "Zen Kaku Gothic New", system-ui, Avenir, Helvetica, Arial,
    sans-serif;
```

---

### フォント運用ルール

- 基本ウェイト：400
- 見出し：500
- 強調（ロゴなど）：700（多用しない）
- 太字の使いすぎは禁止

---

## UI カラーパレット（ひとに血）

### 採用カラーパレット

| 役割                 | 色               | HEX       |
| -------------------- | ---------------- | --------- |
| メイン（文字・ロゴ） | 濃いネイビー     | `#27374D` |
| サブ（補足・UI）     | スモーキーブルー | `#526D82` |
| ボーダー・区切り     | 淡いブルーグレー | `#9DB2BF` |
| 背景                 | ペールブルー     | `#DDE6ED` |

---

### Tailwind CSS 設定例

```css
/* カラーテーマ定義 */
@theme {
  --color-hitonichi-primary: #27374d;
  --color-hitonichi-secondary: #526d82;
  --color-hitonichi-border: #9db2bf;
  --color-hitonichi-background: #dde6ed;
}
```

#### 使用例

```jsx
<div className="bg-nitonichi-background text-nitonichi-primary">
  <p className="text-nitonichi-secondary">今日はどんな一日でしたか</p>
</div>
```

---

## 技術構成（想定）

- Backend：Laravel（API）
- Frontend：React + Vite + Tailwind CSS
- Auth：Laravel Sanctum
- DB：MySQL
- AI：Databricks（後付け）
- Web アプリ（将来モバイル展開を想定）

---

## DB 設計

### users テーブル

| カラム     | 型        | 説明       |
| ---------- | --------- | ---------- |
| id         | bigint    | PK         |
| name       | string    | 表示名     |
| email      | string    | ログイン用 |
| password   | string    | ハッシュ   |
| created_at | timestamp | 作成日時   |
| updated_at | timestamp | 更新日時   |

---

### diaries テーブル

| カラム     | 型        | 説明              |
| ---------- | --------- | ----------------- |
| id         | bigint    | PK                |
| user_id    | bigint    | users.id          |
| diary_date | date      | 日記の日付        |
| content    | text      | 日記本文          |
| is_public  | boolean   | 公開/非公開       |
| ai_comment | text      | AI の感想（任意） |
| created_at | timestamp | 作成日時          |
| updated_at | timestamp | 更新日時          |

- **UNIQUE(user_id, diary_date)**
- 1 ユーザー 1 日 1 件を DB レベルで保証

---

## API 設計

### 認証

#### POST /api/login

- ログイン

#### POST /api/logout

- ログアウト

---

### 日記 API

#### GET /api/diaries/today

- 今日の日記取得・投稿可否判定

レスポンス例（未投稿）

```json
{
  "date": "2026-01-11",
  "can_post": true,
  "diary": null
}
```

レスポンス例（投稿済み）

```json
{
  "date": "2026-01-11",
  "can_post": false,
  "diary": {
    "id": 12,
    "content": "今日は少し疲れた",
    "ai_comment": "よく頑張りましたね"
  }
}
```

---

#### POST /api/diaries

- 日記作成（1 日 1 回）

リクエスト

```json
{
  "content": "今日は〇〇が大変だった"
}
```

- すでに投稿済みの場合は **409 Conflict**

---

#### GET /api/diaries

- 日記一覧取得

クエリ例

```
/api/diaries?from=2026-01-01&to=2026-01-31
```

レスポンス例

```json
[
  { "id": 10, "date": "2026-01-09", "excerpt": "少し落ち込んだ一日" },
  { "id": 11, "date": "2026-01-10", "excerpt": "友達と話して楽になった" }
]
```

---

#### GET /api/diaries/{id}

- 日記詳細取得

レスポンス例

```json
{
  "id": 12,
  "date": "2026-01-11",
  "content": "今日は〇〇が大変だった",
  "ai_comment": "ちゃんと向き合えています",
  "is_public": false
}
```

---

## 作らない API

- PUT /api/diaries/{id}（編集）
- DELETE /api/diaries/{id}（削除）

→ 過去を変えられない思想を API レベルで担保

---

## ステータスコード方針

| 状態           | code      |
| -------------- | --------- |
| 成功           | 200 / 201 |
| バリデーション | 422       |
| 二重投稿       | 409       |
| 未認証         | 401       |
| 権限なし       | 403       |

---

## Controller 構成案

```
App\\Http\\Controllers\\API
├─ AuthController
└─ DiaryController
   ├─ today
   ├─ store
   ├─ index
   └─ show
```

---

## React 画面設計（コンポーネント構成）

### 画面一覧（MVP）

1. ログイン画面
2. トップ画面（今日の日記）
3. 日記一覧画面
4. 日記詳細画面

---

### 全体レイアウト構成

```
<App>
 ├─ <AuthProvider>
 │   ├─ <Header />
 │   └─ <Routes>
 │       ├─ /login
 │       ├─ /
 │       ├─ /diaries
 │       └─ /diaries/:id
```

---

### コンポーネント設計

#### App

- ルーティング管理
- 認証状態の初期化

---

#### AuthProvider

- ログイン状態管理
- トークン保持
- 未ログイン時のリダイレクト制御

---

#### Header

- アプリ名表示
- ログアウトボタン

---

#### LoginPage

- メールアドレス入力
- パスワード入力
- ログイン API 呼び出し

---

#### HomePage（トップ画面）

**使用 API**

- GET /api/diaries/today
- POST /api/diaries

**構成**

```
<HomePage>
 ├─ <TodayDiaryStatus />
 └─ <DiaryForm />
```

- TodayDiaryStatus

  - 今日の日付表示
  - 投稿済み／未投稿表示

- DiaryForm
  - テキスト入力
  - 投稿ボタン
  - 投稿済みの場合は非表示

---

#### DiaryListPage

**使用 API**

- GET /api/diaries

**構成**

```
<DiaryListPage>
 └─ <DiaryList />
      └─ <DiaryListItem />
```

- DiaryList

  - 日付順に表示

- DiaryListItem
  - 日付
  - 本文冒頭（excerpt）
  - 詳細画面へのリンク

---

#### DiaryDetailPage

**使用 API**

- GET /api/diaries/{id}

**構成**

```
<DiaryDetailPage>
 ├─ <DiaryContent />
 └─ <AIComment />
```

- DiaryContent

  - 日付
  - 本文全文

- AIComment
  - AI の感想表示（存在する場合のみ）

---

### 状態管理方針

- 認証情報：Context API
- API 通信：fetch or axios
- フォーム状態：useState

---

### UI 思想

- 余計な情報を出さない
- 入力体験を最優先
- メンタルケア目的のため
  - 色は落ち着いたトーン
  - 否定的表現を出さない

---

## 次のステップ候補

- Laravel Controller 実装
- React と API の接続例
- AI（Databricks）連携詳細設計
