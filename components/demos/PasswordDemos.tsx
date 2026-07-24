"use client";

import { useState } from "react";

export function NicePassword() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const strength =
    value.length === 0
      ? 0
      : Math.min(4, Math.floor(value.length / 3) + (/[0-9]/.test(value) ? 1 : 0));
  const labels = ["", "弱い", "やや弱い", "普通", "強い"];

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        パスワード
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 pr-16 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-indigo-600"
        >
          {show ? "隠す" : "表示"}
        </button>
      </div>
      {value && <p className="mt-1 text-xs text-zinc-400">強度: {labels[strength]}</p>}
      <p className="mt-1 text-xs text-zinc-400">貼り付け(ペースト)も可能です</p>
    </div>
  );
}

export function BadPassword() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        パスワード(20文字まで)
      </label>
      <input
        type="password"
        value={value}
        maxLength={20}
        onPaste={(e) => e.preventDefault()}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
      />
      <p className="mt-1 text-xs text-zinc-400">
        貼り付け不可・21文字目以降は無言で切り捨て・表示切替なし
      </p>
    </div>
  );
}
