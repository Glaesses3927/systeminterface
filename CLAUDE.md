@AGENTS.md

# Project: UIコンポーネント投票ギャラリー

## 課題

インタフェース(ナイス/バッド)のプロトタイプ作成課題への回答として、単体のUIではなく
「コンポーネントごとにナイスUI/バッドUI/評価が分かれるUIを並べて投票してもらう」
Webアプリを開発している。

## 現状(デモ版)

- `app/page.tsx` にコンポーネント一覧(グリッド)を表示。各カードは `components/GalleryCard.tsx`。
- 各UIデモは `components/demos/*.tsx` に実装(nice/bad のペア、または評価が分かれる単体コンポーネント)。
- 投票APIは `app/api/votes/route.ts`。**インメモリ(Map)** で票数を保持しているため、
  サーバー再起動やサーバーレス環境(Lambda)ではリセットされる。デモ用の仮実装。
- 投票済みかどうかは `localStorage` に保存し、同一ブラウザからの多重投票をUI上で防止(強制力はない)。
- 必須要件だった「Amazon方式(トライアングル判定)」は `components/demos/TriangleMenuDemos.tsx` に実装。
  階層ドロップダウンメニューで、親項目からサブメニューへ斜めに移動する際の当たり判定を
  三角形に広げる(+クローズを遅延させる)実装(nice)と、素朴な実装(bad、隙間で即座に閉じる)を比較。

## 未決定事項 / TODO

- **DB未決定**。デプロイ先はAWS Amplifyを想定。候補:
  - Amplify Data (AppSync + DynamoDB) — Amplify Gen2との統合が最も楽
  - 外部DB(Supabase Postgres等)をRoute Handlerから叩く
  - 本番投入時は `app/api/votes/route.ts` のインメモリMapを置き換える
- 投票の不正防止(同一人物の多重投票対策)は未実装。IPやCookieでの軽い制限を検討中。
- 掲載コンポーネントを増やす場合は `app/page.tsx` の `entries` 配列に追記するだけでよい構成。

## 開発

```bash
npm run dev
```

`app/AGENTS.md` の指示に従い、コードを書く前に `node_modules/next/dist/docs/` 配下の該当ドキュメントを確認すること(このプロジェクトはNext.js 16 + React 19)。
