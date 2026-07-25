@AGENTS.md

# Project: UIコンポーネント投票ギャラリー

## 課題

インタフェース(ナイス/バッド)のプロトタイプ作成課題への回答として、単体のUIではなく
「コンポーネントごとにナイスUI/バッドUI/評価が分かれるUIを並べて投票してもらう」
Webアプリを開発している。

## 現状(デモ版)

- `app/page.tsx` にコンポーネント一覧(グリッド)を表示。各カードは `components/GalleryCard.tsx`。
  `wide: true` を指定したエントリはグリッドの全幅を使う(横に広いメニューデモに使用)。
- 各UIデモは `components/demos/*.tsx` に実装(nice/bad のペア、比較用の複数バリエーション、
  または評価が分かれる単体コンポーネント)。
- 投票APIは `app/api/votes/route.ts`。**インメモリ(Map)** で票数を保持しているため、
  サーバー再起動やサーバーレス環境(Lambda)ではリセットされる。デモ用の仮実装。
- 投票済みかどうかは `httpOnly` Cookie(`vote_<componentId>`, 有効期限1日)に保存。サーバー側(`app/api/votes/route.ts`)でもCookieを見て
  二重投票を拒否するため、UI操作だけでなくAPIを直接叩いた場合でも1日以内の再投票は防止される(1日経過後は再投票可能)。
- 投票UI([VoteButtons.tsx](components/VoteButtons.tsx))はNice/Badの**件数は表示せず**、割合バーのみを常時表示する。
  未投票(0票:0票)の場合はバーを1:1(緑50%/赤50%)として表示する。
- 必須要件だった「Amazon方式(トライアングル判定)」は `components/demos/TriangleMenuDemos.tsx` に実装。
  ロゴ+アイコン付きのアカウントメニュー(プロフィール/シェア/設定/お知らせ/お気に入り)で、
  マウスの軌道から「サブメニューへ向かっているか」を計算し当たり判定の三角形を可視化できる(nice、デフォルト非表示の
  チェックボックスで表示切替)実装と、軌道判定を持たない素朴な実装(bad)を比較。どちらも行とサブメニューを結ぶ
  隙間自体では閉じないが、bad は別の行を経由する斜め移動に弱い。

### 掲載カテゴリ一覧

- ナビゲーション(階層メニュー、Amazon方式トライアングル判定) — `TriangleMenuDemos.tsx`
- フォームバリデーション(タイミング・表示・電話番号・クレジットカード) — `ValidationTimingDemos.tsx` /
  `ValidationDisplayDemos.tsx` / `PhoneInputDemos.tsx` / `CreditCardInputDemos.tsx`。
  バリデーション対象はメールアドレス形式に統一。
- 削除操作と取り消し — `DeleteUndoDemos.tsx`(シンプル確認 / 「削除」入力必須確認 / 確認なし+Undo)
- ローディング表示 — `LoadingVariantsDemos.tsx`(スピナーのみ / スケルトンのみ / スケルトン+進捗)
- スイッチ — `SwitchClarityDemos.tsx`。「状態」と「操作」の区別がつかないボタン(例: 常に「通知ON」と
  表示され続け、今ONなのか押すとONになるのか分からない)と、現在の状態がそのまま文言になっているボタンの対比。
- 通知の表示方法 — `NotificationMismatchDemos.tsx`(優先度の低い通知をモーダルで/優先度の高い通知を
  見落としやすいトーストで、という重要度とUIのミスマッチ例)

以下は削除済み(初期デモ用の単純なコンポーネントで、以降不要と判断):
`ButtonDemos.tsx` / `CookieConsentDemos.tsx` / `FormLabelDemos.tsx` / `ModalDemos.tsx` / `PasswordDemos.tsx` /
`DestructiveConfirmDemos.tsx`(→削除操作と取り消しに統合) / `LoadingDemos.tsx`(→ローディング表示に統合) /
`ScrollDemos.tsx`(無限スクロールデモ)。

## 未決定事項 / TODO

- **DB未決定**。デプロイ先はAWS Amplifyを想定。候補:
  - Amplify Data (AppSync + DynamoDB) — Amplify Gen2との統合が最も楽
  - 外部DB(Supabase Postgres等)をRoute Handlerから叩く
  - 本番投入時は `app/api/votes/route.ts` のインメモリMapを置き換える
- 投票の不正防止は「同一ブラウザで1日以内の再投票を防ぐ」Cookie制限のみ実装済み。Cookie削除やシークレットモードでの回避は可能なため、
  本格的な不正防止(IP制限等)が必要なら別途検討。
- 掲載コンポーネントを増やす場合は `app/page.tsx` の `entries` 配列に追記するだけでよい構成。

## 開発

```bash
npm run dev
```

`app/AGENTS.md` の指示に従い、コードを書く前に `node_modules/next/dist/docs/` 配下の該当ドキュメントを確認すること(このプロジェクトはNext.js 16 + React 19)。
