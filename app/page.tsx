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
  CreditCardSplitBoxes,
} from "@/components/demos/CreditCardInputDemos";
import {
  DeleteSimpleConfirm,
  DeleteTypeToConfirm,
  DeleteWithUndo,
} from "@/components/demos/DeleteUndoDemos";
import {
  LoadingSpinnerOnly,
  LoadingSkeletonOnly,
} from "@/components/demos/LoadingVariantsDemos";
import { SwitchUnclear, SwitchClear } from "@/components/demos/SwitchClarityDemos";
import { IdempotentToggleSwitch } from "@/components/demos/IdempotentToggleDemos";
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
    id: "menu-bad",
    category: "ナビゲーション",
    title: "階層メニュー(Simple)",
    description: "シンプルな実装です",
    Demo: BadTriangleMenu,
    wide: true,
  },
  {
    id: "menu-nice",
    category: "ナビゲーション",
    title: "階層メニュー(三角判定)",
    description:
      "カーソルとサブメニュー上下端を結ぶ三角形に当たり判定を付与しています",
    Demo: NiceTriangleMenu,
    wide: true,
  },
  {
    id: "validation-keystroke",
    category: "フォームバリデーション(タイミング)",
    title: "1文字ごとに判定",
    description: "入力中であってもバリデーションが走ります",
    Demo: ValidationOnKeystroke,
  },
  {
    id: "validation-blur",
    category: "フォームバリデーション(タイミング)",
    title: "フォーカスが外れた後に判定",
    description: "入力し終えたタイミングでバリデーションが走ります",
    Demo: ValidationOnBlur,
  },
  {
    id: "validation-debounce",
    category: "フォームバリデーション(タイミング)",
    title: "最終入力から数秒後に判定",
    description: "入力が止まってから少し待ってバリデーションが走ります",
    Demo: ValidationOnDebounce,
  },
  {
    id: "validation-submit",
    category: "フォームバリデーション(タイミング)",
    title: "送信時のみ判定",
    description: "送信時にバリデーションが走ります",
    Demo: ValidationOnSubmit,
  },
  {
    id: "validation-top-summary",
    category: "フォームバリデーション(表示)",
    title: "画面上部にまとめて表示",
    description: "エラーが上部にまとめて表示されます",
    Demo: ValidationTopSummary,
  },
  {
    id: "validation-inline",
    category: "フォームバリデーション(表示)",
    title: "入力欄下部に表示",
    description: "該当箇所にエラーが表示されます",
    Demo: ValidationInline,
  },
  {
    id: "validation-generic",
    category: "フォームバリデーション(表示)",
    title: "エラー内容が曖昧",
    description: "",
    Demo: ValidationGenericOnly,
  },
  {
    id: "validation-inline-fix",
    category: "フォームバリデーション(表示)",
    title: "エラー内容が具体的",
    description: "",
    Demo: ValidationInlineWithFix,
  },
  {
    id: "validation-success-check",
    category: "フォームバリデーション(表示)",
    title: "正常入力時にチェックマーク表示",
    description: "",
    Demo: ValidationSuccessCheck,
  },
  {
    id: "phone-split",
    category: "フォームバリデーション(電話番号)",
    title: "3つのボックスに分解",
    description: "",
    Demo: PhoneSplitBoxes,
  },
  {
    id: "phone-hyphen-required",
    category: "フォームバリデーション(電話番号)",
    title: "ハイフン必須",
    description: "",
    Demo: PhoneHyphenRequired,
  },
  {
    id: "phone-hyphen-optional",
    category: "フォームバリデーション(電話番号)",
    title: "ハイフン任意",
    description: "",
    Demo: PhoneHyphenOptional,
  },
  {
    id: "creditcard-split",
    category: "フォームバリデーション(クレジットカード)",
    title: "4つのボックスに分解",
    description: "",
    Demo: CreditCardSplitBoxes,
  },
  {
    id: "creditcard-auto-format",
    category: "フォームバリデーション(クレジットカード)",
    title: "1つのボックスで自動整形",
    description: "4桁ごとに半角スペースを自動挿入します",
    Demo: CreditCardAutoFormat,
  },
  {
    id: "delete-simple-confirm",
    category: "削除操作と取り消し",
    title: "削除確認モーダル",
    description: "「本当に削除しますか?」の一問だけ確認する",
    Demo: DeleteSimpleConfirm,
  },
  {
    id: "delete-type-to-confirm",
    category: "削除操作と取り消し",
    title: "削除と入力して削除",
    description: "誤操作を防ぐための二段階確認",
    Demo: DeleteTypeToConfirm,
  },
  {
    id: "delete-with-undo",
    category: "削除操作と取り消し",
    title: "確認不要&Undo可",
    description: "即座に削除されるが、しばらくは元に戻せる",
    Demo: DeleteWithUndo,
  },
  {
    id: "loading-spinner-only",
    category: "ローディング表示",
    title: "スピナーのみ",
    description: "",
    Demo: LoadingSpinnerOnly,
  },
  {
    id: "loading-skeleton-only",
    category: "ローディング表示",
    title: "スケルトンのみ",
    description: "",
    Demo: LoadingSkeletonOnly,
  },
  {
    id: "switch-unclear",
    category: "スイッチ",
    title: "状態か操作か不明なボタン",
    description: "今ONなのか押すとONになるのかが分からない",
    Demo: SwitchUnclear,
  },
  {
    id: "switch-clear",
    category: "スイッチ",
    title: "状態を表すボタン",
    description: "",
    Demo: SwitchClear,
  },
  {
    id: "switch-idempotent",
    category: "スイッチ",
    title: "冪等なトグルスイッチ",
    description: "https://ui.tato.bio/idempotent-toggle",
    Demo: IdempotentToggleSwitch,
  },
  {
    id: "notification-modal-low-priority",
    category: "通知の表示方法",
    title: "モーダル表示",
    description: "操作をブロックするモーダルで表示される",
    Demo: NotificationModalForLowPriority,
  },
  {
    id: "notification-toast-high-priority",
    category: "通知の表示方法",
    title: "トースト表示",
    description: "数秒で消えるトーストで表示される",
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
