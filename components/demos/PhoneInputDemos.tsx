"use client";

import { useRef, useState } from "react";

export function PhoneSplitBoxes() {
  const [parts, setParts] = useState(["", "", ""]);
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const maxLens = [3, 4, 4];

  function handleChange(index: number, raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, maxLens[index]);
    const next = [...parts];
    next[index] = digits;
    setParts(next);
    if (digits.length === maxLens[index] && index < 2) {
      refs[index + 1].current?.focus();
    }
  }

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        電話番号(3つのボックスに分解)
      </label>
      <div className="flex items-center gap-1.5">
        {parts.map((part, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input
              ref={refs[i]}
              value={part}
              onChange={(e) => handleChange(i, e.target.value)}
              inputMode="numeric"
              maxLength={maxLens[i]}
              className="w-16 rounded-md border border-zinc-300 px-2 py-2 text-center text-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            />
            {i < 2 && <span className="text-zinc-400">-</span>}
          </div>
        ))}
      </div>
      <p className="mt-1 text-xs text-zinc-400">ハイフンは装飾のみ・入力の必要はありません</p>
    </div>
  );
}

export function PhoneHyphenRequired() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = /^\d{3}-\d{4}-\d{4}$/.test(value);
  const invalid = touched && value.length > 0 && !valid;

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        電話番号(ハイフン必須)
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="090-1234-5678"
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:bg-zinc-900 ${
          invalid ? "border-rose-400" : "border-zinc-300 dark:border-zinc-700"
        }`}
      />
      {invalid && (
        <p className="mt-1 text-xs text-rose-500">
          090-1234-5678 の形式でハイフンを含めて入力してください
        </p>
      )}
    </div>
  );
}

export function PhoneHyphenOptional() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const digitsOnly = value.replace(/\D/g, "");
  const invalid = touched && value.length > 0 && digitsOnly.length !== 11;

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        電話番号(ハイフンは任意)
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="09012345678 でも 090-1234-5678 でもOK"
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:bg-zinc-900 ${
          invalid ? "border-rose-400" : "border-zinc-300 dark:border-zinc-700"
        }`}
      />
      {invalid && <p className="mt-1 text-xs text-rose-500">11桁の数字を入力してください</p>}
    </div>
  );
}
