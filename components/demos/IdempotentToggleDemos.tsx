"use client";

import { useState } from "react";

// 参考: https://ui.tato.bio/idempotent-toggle
// 見た目は通常のトグルスイッチだが、当たり判定が左右2つの領域に分かれており、
// 左側(OFF側)を押すと何度押しても必ずOFFに、右側(ON側)を押すと何度押しても必ずONになる。
// 「今の状態を確認しなくても、押した結果は常に一定」という意味で冪等な操作を提供する。
export function IdempotentToggleSwitch() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-8 w-16 rounded-full border border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
        <button
          type="button"
          aria-label="OFFにする"
          onClick={() => setOn(false)}
          className="relative z-10 flex-1 rounded-l-full"
        />
        <button
          type="button"
          aria-label="ONにする"
          onClick={() => setOn(true)}
          className="relative z-10 flex-1 rounded-r-full"
        />
        <span
          className={`pointer-events-none absolute top-1 h-6 w-6 rounded-full shadow transition-transform ${
            on ? "translate-x-8 bg-emerald-500" : "translate-x-1 bg-white dark:bg-zinc-200"
          }`}
        />
      </div>
      <p className="max-w-[240px] text-center text-xs text-zinc-400">
        左半分を押すと必ずOFF、右半分を押すと必ずONになる。
      </p>
    </div>
  );
}
