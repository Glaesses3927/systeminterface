"use client";

import { useMemo, useState } from "react";
import { GalleryCard } from "@/components/GalleryCard";
import {
  NiceTriangleMenu,
  BadTriangleMenu,
} from "@/components/demos/TriangleMenuDemos";
import {
  ValidationOnKeystroke,
  ValidationOnBlur,
  ValidationOnDebounce,
  ValidationOnSubmit,
} from "@/components/demos/ValidationTimingDemos";
import {
  ValidationGenericOnly,
  ValidationTopSummary,
  ValidationInline,
  ValidationInlineWithFix,
  ValidationSuccessCheck,
} from "@/components/demos/ValidationDisplayDemos";
import {
  PhoneSplitBoxes,
  PhoneHyphenRequired,
  PhoneHyphenOptional,
} from "@/components/demos/PhoneInputDemos";
import {
  CreditCardAutoFormat,
  CreditCardRaw,
} from "@/components/demos/CreditCardInputDemos";
import {
  DeleteSimpleConfirm,
  DeleteTypeToConfirm,
  DeleteWithUndo,
} from "@/components/demos/DeleteUndoDemos";
import {
  LoadingSpinnerOnly,
  LoadingSkeletonOnly,
  LoadingSkeletonWithProgress,
} from "@/components/demos/LoadingVariantsDemos";
import { SwitchUnclear, SwitchClear } from "@/components/demos/SwitchClarityDemos";
import {
  NotificationModalForLowPriority,
  NotificationToastForHighPriority,
} from "@/components/demos/NotificationMismatchDemos";

type GalleryEntry = {
  id: string;
  category: string;
  title: string;
  description: string;
  Demo: () => React.ReactElement;
  wide?: boolean;
};

const entries: GalleryEntry[] = [
  {
    id: "menu-nice",
    category: "ナビゲーション",
    title: "階層メニュー(Amazon方式)",
    description:
      "カーソルとサブメニュー上下端を結ぶ三角形に当たり判定を付与する",
    Demo: NiceTriangleMenu,
    wide: true,
  },
  {
    id: "menu-bad",
    category: "ナビゲーション",
    title: "階層メニュー(Simple)",
    description: "当たり判定の余白がなく、斜め移動で即座に閉じてしまう",
    Demo: BadTriangleMenu,
    wide: true,
  },
  {
    id: "validation-keystroke",
    category: "フォームバリデーション(タイミング)",
    title: "1文字ごとに判定",
    description: "入力中の未完成な状態にもエラーが即座に出る",
    Demo: ValidationOnKeystroke,
  },
  {
    id: "validation-blur",
    category: "フォームバリデーション(タイミング)",
    title: "フォーカスが外れた後に判定",
    description: "入力し終えたタイミングでエラーが出る",
    Demo: ValidationOnBlur,
  },
  {
    id: "validation-debounce",
    category: "フォームバリデーション(タイミング)",
    title: "最終入力から数秒後に判定",
    description: "入力が止まってから少し待ってエラーが出る",
    Demo: ValidationOnDebounce,
  },
  {
    id: "validation-submit",
    category: "フォームバリデーション(タイミング)",
    title: "送信時のみ判定",
    description: "入力中は何も分からず、送信して初めてエラーが分かる",
    Demo: ValidationOnSubmit,
  },
  {
    id: "validation-generic",
    category: "フォームバリデーション(表示)",
    title: "エラー内容が不十分",
    description: "何が具体的に悪いのかは分からない",
    Demo: ValidationGenericOnly,
  },
  {
    id: "validation-top-summary",
    category: "フォームバリデーション(表示)",
    title: "送信後に画面上部へまとめて表示",
    description: "エラー一覧が該当の入力欄から離れた場所に出る",
    Demo: ValidationTopSummary,
  },
  {
    id: "validation-inline",
    category: "フォームバリデーション(表示)",
    title: "入力欄のすぐ下に原因を表示",
    description: "何が間違っているかは分かるが、直し方は分からない",
    Demo: ValidationInline,
  },
  {
    id: "validation-inline-fix",
    category: "フォームバリデーション(表示)",
    title: "原因と修正方法を表示",
    description: "何が間違っていて、どう直せばいいかが分かる",
    Demo: ValidationInlineWithFix,
  },
  {
    id: "validation-success-check",
    category: "フォームバリデーション(表示)",
    title: "正常入力時にチェックマーク表示",
    description: "エラーだけでなく、OKであることも分かる",
    Demo: ValidationSuccessCheck,
  },
  {
    id: "phone-split",
    category: "フォームバリデーション(電話番号)",
    title: "3つのボックスに分解",
    description: "市外局番・前半・後半が別々の入力欄になっている",
    Demo: PhoneSplitBoxes,
  },
  {
    id: "phone-hyphen-required",
    category: "フォームバリデーション(電話番号)",
    title: "ハイフン必須",
    description: "ハイフンを含めて入力しないとエラーになる",
    Demo: PhoneHyphenRequired,
  },
  {
    id: "phone-hyphen-optional",
    category: "フォームバリデーション(電話番号)",
    title: "ハイフン任意",
    description: "ハイフンの有無にかかわらず桁数だけで判定する",
    Demo: PhoneHyphenOptional,
  },
  {
    id: "creditcard-auto-format",
    category: "フォームバリデーション(クレジットカード)",
    title: "自動で4桁ごとに区切る",
    description: "入力するたびに空白が自動で入り、確認しやすい",
    Demo: CreditCardAutoFormat,
  },
  {
    id: "creditcard-raw",
    category: "フォームバリデーション(クレジットカード)",
    title: "区切りなしでそのまま表示",
    description: "16桁の数字が連続して見づらい",
    Demo: CreditCardRaw,
  },
  {
    id: "delete-simple-confirm",
    category: "削除操作と取り消し",
    title: "シンプルな削除確認モーダル",
    description: "「本当に削除しますか?」の一問だけ確認する",
    Demo: DeleteSimpleConfirm,
  },
  {
    id: "delete-type-to-confirm",
    category: "削除操作と取り消し",
    title: "「削除」と入力しないと削除できない",
    description: "誤操作を防ぐための二段階確認",
    Demo: DeleteTypeToConfirm,
  },
  {
    id: "delete-with-undo",
    category: "削除操作と取り消し",
    title: "確認なしで削除、Undoで取り消し",
    description: "即座に削除されるが、しばらくは元に戻せる",
    Demo: DeleteWithUndo,
  },
  {
    id: "loading-spinner-only",
    category: "ローディング表示",
    title: "スピナーのみ",
    description: "読み込み中であることは分かるが、内容の見通しはない",
    Demo: LoadingSpinnerOnly,
  },
  {
    id: "loading-skeleton-only",
    category: "ローディング表示",
    title: "スケルトンのみ",
    description: "これから表示される内容の形がうっすら見える",
    Demo: LoadingSkeletonOnly,
  },
  {
    id: "loading-skeleton-progress",
    category: "ローディング表示",
    title: "スケルトン+進捗表示",
    description: "内容の形と進捗率の両方が分かる",
    Demo: LoadingSkeletonWithProgress,
  },
  {
    id: "switch-unclear",
    category: "スイッチ",
    title: "状態か操作か分からないボタン",
    description: "「通知ON」の文言が常に変わらず、今ONなのか押すとONになるのかが分からない",
    Demo: SwitchUnclear,
  },
  {
    id: "switch-clear",
    category: "スイッチ",
    title: "状態がそのまま文言になっているボタン",
    description: "「通知はONです/OFFです」と現在の状態がそのまま表示される",
    Demo: SwitchClear,
  },
  {
    id: "notification-modal-low-priority",
    category: "通知の表示方法",
    title: "些細な通知をモーダルで表示",
    description: "優先度の低い内容なのに操作をブロックするモーダルで表示される",
    Demo: NotificationModalForLowPriority,
  },
  {
    id: "notification-toast-high-priority",
    category: "通知の表示方法",
    title: "重要な通知をトーストで表示",
    description: "優先度の高い失敗通知が、数秒で消えるトーストで見落とされやすい",
    Demo: NotificationToastForHighPriority,
  },
];

function chipClass(active: boolean) {
  return `whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
    active
      ? "bg-amber-600 text-white dark:bg-amber-500 dark:text-zinc-950"
      : "text-zinc-500 hover:bg-amber-50 dark:text-zinc-400 dark:hover:bg-amber-500/10"
  }`;
}

export default function Home() {
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const entry of entries) {
      if (!seen.has(entry.category)) {
        seen.add(entry.category);
        list.push(entry.category);
      }
    }
    return list;
  }, []);

  const [active, setActive] = useState<string | null>(null);
  const visibleCategories = active ? categories.filter((c) => c === active) : categories;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background/95 backdrop-blur-sm dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 pt-6">
          <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-700 dark:text-amber-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-500" />
            UI Vote Gallery
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            ナイス・バッド インタフェース投票
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            それぞれのコンポーネントを実際に操作し、良いUIか悪いUIかを投票してください。
            評価が分かれそうなものも含まれています。
          </p>
        </div>
        <nav className="mx-auto max-w-6xl overflow-x-auto px-6 py-3">
          <div className="flex gap-1">
            <button onClick={() => setActive(null)} className={chipClass(active === null)}>
              すべて
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={chipClass(active === category)}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {visibleCategories.map((category) => (
          <section key={category} className="mb-14">
            <h2 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400">
              <span className="inline-block h-1 w-3 rounded-full bg-amber-500/70" />
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {entries
                .filter((entry) => entry.category === category)
                .map(({ id, title, description, Demo, wide }) => (
                  <GalleryCard key={id} id={id} title={title} description={description} wide={wide}>
                    <Demo />
                  </GalleryCard>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
