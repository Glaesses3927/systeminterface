"use client";

import { useState } from "react";

export function AmbiguousToggle() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-7 w-14 rounded-full transition-colors ${
          on ? "bg-rose-500" : "bg-emerald-500"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
      <p className="text-xs text-zinc-400">
        ON(右)が赤、OFF(左)が緑 — 通常の配色と逆
      </p>
    </div>
  );
}

export function InfiniteScrollDemo() {
  const [items, setItems] = useState(8);
  return (
    <div className="w-full max-w-xs">
      <div
        className="h-40 overflow-y-auto rounded-md border border-zinc-200 dark:border-zinc-700"
        onScroll={(e) => {
          const el = e.currentTarget;
          if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
            setItems((n) => Math.min(n + 4, 40));
          }
        }}
      >
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {Array.from({ length: items }, (_, i) => (
            <li key={i} className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300">
              アイテム {i + 1}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        下までスクロールすると自動で追加読み込み(ページ番号なし)
      </p>
    </div>
  );
}
