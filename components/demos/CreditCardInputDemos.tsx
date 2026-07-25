"use client";

import { useState } from "react";

export function CreditCardAutoFormat() {
  const [value, setValue] = useState("");

  function handleChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g) ?? [];
    setValue(groups.join(" "));
  }

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        カード番号(自動で4桁ごとに空白を挿入)
      </label>
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        inputMode="numeric"
        placeholder="4242 4242 4242 4242"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm tracking-wider focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
      />
    </div>
  );
}

export function CreditCardRaw() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        カード番号(区切りなし)
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 16))}
        inputMode="numeric"
        placeholder="4242424242424242"
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
      />
      <p className="mt-1 text-xs text-zinc-400">16桁が数字の連続で表示され、一目で確認しづらい</p>
    </div>
  );
}
