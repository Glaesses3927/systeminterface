import { GalleryCard } from "@/components/GalleryCard";
import { NiceButton, BadButton } from "@/components/demos/ButtonDemos";
import { NiceForm, BadForm } from "@/components/demos/FormLabelDemos";
import {
  NiceTriangleMenu,
  BadTriangleMenu,
} from "@/components/demos/TriangleMenuDemos";
import {
  NiceCookieConsent,
  BadCookieConsent,
} from "@/components/demos/CookieConsentDemos";
import { NiceModal, BadModal } from "@/components/demos/ModalDemos";
import { NicePassword, BadPassword } from "@/components/demos/PasswordDemos";
import {
  NiceDestructiveConfirm,
  BadDestructiveConfirm,
} from "@/components/demos/DestructiveConfirmDemos";
import { NiceLoading, BadLoading } from "@/components/demos/LoadingDemos";
import {
  AmbiguousToggle,
  InfiniteScrollDemo,
} from "@/components/demos/AmbiguousDemos";

const entries = [
  {
    id: "button-nice",
    category: "ボタン",
    title: "はっきりしたボタン",
    description: "押せることが分かり、押すとフィードバックがある",
    Demo: NiceButton,
  },
  {
    id: "button-bad",
    category: "ボタン",
    title: "テキストに見えるボタン",
    description: "色のコントラストが低く、押しても反応がない",
    Demo: BadButton,
  },
  {
    id: "form-nice",
    category: "フォーム",
    title: "常時表示ラベル",
    description: "入力中もラベルが消えず、入力欄の意味を保持する",
    Demo: NiceForm,
  },
  {
    id: "form-bad",
    category: "フォーム",
    title: "placeholderのみラベル",
    description: "入力を始めるとラベル代わりのplaceholderが消える",
    Demo: BadForm,
  },
  {
    id: "menu-nice",
    category: "ナビゲーション",
    title: "階層メニュー(Amazon方式)",
    description:
      "親項目からサブメニューへ斜めに移動しても、三角形の当たり判定と遅延クローズで閉じにくい",
    Demo: NiceTriangleMenu,
  },
  {
    id: "menu-bad",
    category: "ナビゲーション",
    title: "階層メニュー(素朴な実装)",
    description: "当たり判定の余白がなく、斜め移動で即座に閉じてしまう",
    Demo: BadTriangleMenu,
  },
  {
    id: "cookie-nice",
    category: "同意・契約",
    title: "対等な選択肢のCookie同意",
    description: "同意/拒否のボタンが同じ見た目の重みで並んでいる",
    Demo: NiceCookieConsent,
  },
  {
    id: "cookie-bad",
    category: "同意・契約",
    title: "非対称なCookie同意(ダークパターン)",
    description: "同意ボタンだけ目立たせ、拒否は罪悪感を煽る小さな文字",
    Demo: BadCookieConsent,
  },
  {
    id: "modal-nice",
    category: "モーダル",
    title: "閉じ方が複数あるモーダル",
    description: "Esc・外側クリック・✕ボタンのいずれでも閉じられる",
    Demo: NiceModal,
  },
  {
    id: "modal-bad",
    category: "モーダル",
    title: "閉じにくいモーダル",
    description: "Escも外側クリックも無効で、閉じるボタンも極小",
    Demo: BadModal,
  },
  {
    id: "password-nice",
    category: "入力(セキュリティ)",
    title: "使いやすいパスワード入力",
    description: "表示切替・強度表示があり、貼り付けも可能",
    Demo: NicePassword,
  },
  {
    id: "password-bad",
    category: "入力(セキュリティ)",
    title: "制約の多いパスワード入力",
    description: "貼り付け不可・文字数を無言で切り捨て・表示切替なし",
    Demo: BadPassword,
  },
  {
    id: "confirm-nice",
    category: "確認ダイアログ",
    title: "安全な削除確認",
    description: "「DELETE」と入力しないと削除できない二段階確認",
    Demo: NiceDestructiveConfirm,
  },
  {
    id: "confirm-bad",
    category: "確認ダイアログ",
    title: "危険な削除確認",
    description: "OKボタンに自動フォーカスがあり、Enterで誤操作しやすい",
    Demo: BadDestructiveConfirm,
  },
  {
    id: "loading-nice",
    category: "ローディング",
    title: "スケルトン表示",
    description: "読み込み中の内容の形を示し、終了時間の見通しを与える",
    Demo: NiceLoading,
  },
  {
    id: "loading-bad",
    category: "ローディング",
    title: "終わらないスピナー",
    description: "進捗も残り時間も分からず、いつまでも回り続ける",
    Demo: BadLoading,
  },
  {
    id: "toggle-ambiguous",
    category: "スイッチ",
    title: "色が逆のトグルスイッチ",
    description: "ONが赤・OFFが緑という配色。分かりやすいか紛らわしいか?",
    Demo: AmbiguousToggle,
  },
  {
    id: "scroll-ambiguous",
    category: "一覧表示",
    title: "無限スクロール",
    description: "ページ番号なしで自動的に追加読み込みされる一覧",
    Demo: InfiniteScrollDemo,
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            UIコンポーネント投票ギャラリー
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
            各コンポーネントを実際に操作してみて、ナイス👍かバッド👎か投票してください。
            人によって評価が分かれそうなものも含まれています。
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(({ id, category, title, description, Demo }) => (
            <GalleryCard
              key={id}
              id={id}
              category={category}
              title={title}
              description={description}
            >
              <Demo />
            </GalleryCard>
          ))}
        </div>
      </main>
    </div>
  );
}
