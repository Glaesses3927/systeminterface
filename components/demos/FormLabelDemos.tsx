"use client";

import { useState } from "react";

export function NiceForm() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-xs">
      <label
        htmlFor="nice-email"
        className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        メールアドレス
      </label>
      <input
        id="nice-email"
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
      />
      <p className="mt-1 text-xs text-zinc-400">入力中もラベルは残ります</p>
    </div>
  );
}

export function BadForm() {
  return (
    <div className="w-full max-w-xs">
      <input
        type="email"
        placeholder="メールアドレス"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
      />
      <p className="mt-1 text-xs text-zinc-400">
        入力するとラベルが消えます(placeholderのみ)
      </p>
    </div>
  );
}
