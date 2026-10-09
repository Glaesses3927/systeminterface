# UIvote — ナイス・バッド インタフェース投票

UIコンポーネントを実際に操作して、「良いUI(Nice)」か「悪いUI(Bad)」かを投票してもらうギャラリー型Webアプリです。

インタフェース(ナイス/バッド)のプロトタイプ作成課題への回答として作りました。
UIをひとつだけ作るのではなく、**同じ目的のコンポーネントを複数の実装で並べ**、良し悪しを利用者に判断してもらう構成にしています。
明らかなナイス/バッドのペアだけでなく、**評価が分かれそうな実装**も含めています。

## 主な機能

- **触って比較できるデモ** — 各カードのUIはスクリーンショットではなく、実際に動くコンポーネントです
- **Nice / Bad 投票** — 票数は表示せず、Nice:Bad の割合バーだけを表示します(未投票時は 50:50)
- **二重投票の防止** — 投票済みかどうかを `httpOnly` Cookie に保存し、サーバー側でも確認します。同じブラウザからは1日1回まで投票できます
- **カテゴリフィルタ** — ヘッダーのチップでカテゴリごとに絞り込めます

## 掲載しているコンポーネント

| カテゴリ | 比較しているもの | 実装 |
| --- | --- | --- |
| ナビゲーション | 階層メニュー:素朴な実装 / Amazon方式の三角形判定 | [TriangleMenuDemos.tsx](components/demos/TriangleMenuDemos.tsx) |
| フォームバリデーション(タイミング) | 1文字ごと / フォーカスが外れた後 / 入力停止の数秒後 / 送信時のみ | [ValidationTimingDemos.tsx](components/demos/ValidationTimingDemos.tsx) |
| フォームバリデーション(電話番号) | 3つの入力欄に分割 / ハイフン必須 / ハイフン任意 | [PhoneInputDemos.tsx](components/demos/PhoneInputDemos.tsx) |
| フォームバリデーション(クレジットカード) | 4つの入力欄に分割 / 1つの入力欄で自動整形 | [CreditCardInputDemos.tsx](components/demos/CreditCardInputDemos.tsx) |
| 削除操作と取り消し | 確認モーダル / 「削除」と入力して確認 / 確認なし+Undo | [DeleteUndoDemos.tsx](components/demos/DeleteUndoDemos.tsx) |
| ローディング表示 | スピナーのみ / スケルトンのみ | [LoadingVariantsDemos.tsx](components/demos/LoadingVariantsDemos.tsx) |
| スイッチ | 状態か操作か分からないボタン / 状態を表すボタン / 冪等なトグルスイッチ | [SwitchClarityDemos.tsx](components/demos/SwitchClarityDemos.tsx), [IdempotentToggleDemos.tsx](components/demos/IdempotentToggleDemos.tsx) |
| 通知の表示方法 | 優先度の低い通知をモーダルで / 優先度の高い通知をトーストで | [NotificationMismatchDemos.tsx](components/demos/NotificationMismatchDemos.tsx) |

### 注目: Amazon方式の三角形判定メニュー

階層メニューで親項目からサブメニューへ斜めにカーソルを動かすと、途中で別の行を横切ってサブメニューが切り替わってしまうことがあります。
三角形判定版では、カーソル位置とサブメニューの上端・下端を結ぶ三角形を当たり判定とし、カーソルがその中を進んでいる間はサブメニューを切り替えません。
チェックボックスをオンにすると判定用の三角形が表示されます。

## 技術スタック

- [Next.js](https://nextjs.org) 16(App Router)+ React 19 + TypeScript
- Tailwind CSS v4
- [AWS Amplify Gen 2](https://docs.amplify.aws/) — Amplify Data(AppSync + DynamoDB)に票数を保存

## ディレクトリ構成

```
app/
  page.tsx              # ギャラリー本体。掲載コンポーネントの一覧(entries)を定義
  layout.tsx
  api/votes/route.ts    # 投票API(GET: 集計取得 / POST: 投票)
components/
  GalleryCard.tsx       # 各デモを囲むカード
  VoteButtons.tsx       # Nice/Bad ボタンと割合バー
  demos/                # 各UIデモの実装
lib/
  amplifyClient.ts      # amplify_outputs.json を読み込んで Amplify Data クライアントを初期化
amplify/
  backend.ts            # Amplify バックエンド定義
  data/resource.ts      # ComponentVote モデル(componentId, nice, bad)
```

## セットアップ

### 前提

- Node.js(Next.js 16 が動作するバージョン)
- AWS アカウントと認証情報(`aws configure` などで設定済みであること)

### 手順

```bash
npm install
```

Amplify Data のバックエンド(DynamoDB など)を自分の AWS アカウント上に作成します。
実行すると `amplify_outputs.json` が生成され、以降はローカルの変更が反映され続けます。

```bash
npm run sandbox
```

`amplify_outputs.json` が生成されたら、別のターミナルで開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

> `amplify_outputs.json` は `.gitignore` 済みです。生成前は `lib/amplifyClient.ts` の import がビルドエラーになります。

### Google Analytics(任意)

環境変数 `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` に GA4 の測定ID(`G-XXXXXXXXXX`)を設定すると、Google Analytics が有効になります。
未設定のときは読み込まれません。

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

Amplify Hosting では、コンソールの「環境変数」に同じ名前で設定してください(ビルド時に埋め込まれるため、設定後に再デプロイが必要です)。
ページビューに加え、投票時に `vote` イベント(パラメータ `component_id`, `vote_type`)を送信します。

## 投票APIの仕様

| メソッド | パス | 内容 |
| --- | --- | --- |
| `GET` | `/api/votes` | 全コンポーネントの票数と、このブラウザでの投票済み状態を返す |
| `POST` | `/api/votes` | `{ "id": "<componentId>", "vote": "nice" \| "bad" }` で投票する。投票済みなら票数は変えずに現在値を返す |

- 投票済みの記録は Cookie `vote_<componentId>`(`httpOnly`、有効期限1日)に保存します
- 票数の加算は「読み取って+1して書き込む」方式です。同時に投票が重なると、ごく稀に1票ずれる可能性がありますが、このアプリの規模では許容しています

## コンポーネントの追加方法

1. `components/demos/` にデモコンポーネントを作る
2. `app/page.tsx` の `entries` 配列にエントリを追加する

```tsx
{
  id: "my-component",          // 投票の集計キー(一意にする)
  category: "カテゴリ名",       // 同じカテゴリ名のものがまとめて表示される
  title: "タイトル",
  description: "説明文",
  Demo: MyComponentDemo,
  wide: false,                 // true にするとグリッドの全幅を使う
},
```

DB側の設定は不要です。最初の投票時にレコードが自動作成されます。

## 既知の制約

- 不正投票対策は Cookie による「同じブラウザで1日1回」のみです。Cookie の削除やシークレットウィンドウでは再投票できます
