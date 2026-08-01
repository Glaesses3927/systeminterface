"use client";

import { useRef, useState } from "react";

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
        カード番号
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

export function CreditCardSplitBoxes() {
  const [parts, setParts] = useState(["", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function handleChange(index: number, raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    const next = [...parts];
    next[index] = digits;
    setParts(next);
    if (digits.length === 4 && index < 3) {
      refs[index + 1].current?.focus();
    }
  }

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        カード番号(4つのボックスに分解)
      </label>
      <div className="flex items-center gap-1.5">
        {parts.map((part, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={part}
            onChange={(e) => handleChange(i, e.target.value)}
            inputMode="numeric"
            maxLength={4}
            placeholder="4242"
            className="w-16 rounded-md border border-zinc-300 px-2 py-2 text-center text-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}
