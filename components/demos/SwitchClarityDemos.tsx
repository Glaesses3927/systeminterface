"use client";

import { useState } from "react";

export function SwitchUnclear() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
      >
        通知{on ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export function SwitchClear() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          on
            ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
            : "border-zinc-300 bg-white text-zinc-500 dark:border-zinc-600 dark:bg-zinc-900"
        }`}
      >
        通知は{on ? "ON" : "OFF"}です
      </button>
    </div>
  );
}
