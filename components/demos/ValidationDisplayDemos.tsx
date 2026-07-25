"use client";

import { useState } from "react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ValidationGenericOnly() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = touched && value.length > 0 && !isValidEmail(value);

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:bg-zinc-900 ${
          invalid ? "border-rose-400" : "border-zinc-300 dark:border-zinc-700"
        }`}
      />
      {invalid && <p className="mt-1 text-xs text-rose-500">正しいメールアドレスを入力してください</p>}
    </div>
  );
}

export function ValidationTopSummary() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit() {
    const next: string[] = [];
    if (!isValidEmail(email)) next.push("メールアドレスの形式が正しくありません");
    if (password.length < 8) next.push("パスワードは8文字以上で入力してください");
    setErrors(next);
  }

  return (
    <div className="w-full max-w-xs">
      {errors.length > 0 && (
        <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 p-2 text-xs text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          <ul className="list-inside list-disc space-y-0.5">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
      />
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        パスワード
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white"
      >
        送信
      </button>
    </div>
  );
}

export function ValidationInline() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = touched && value.length > 0 && !isValidEmail(value);

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:bg-zinc-900 ${
          invalid ? "border-rose-400" : "border-zinc-300 dark:border-zinc-700"
        }`}
      />
      {invalid && (
        <p className="mt-1 text-xs text-rose-500">メールアドレスの形式が正しくありません</p>
      )}
    </div>
  );
}

export function ValidationInlineWithFix() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = touched && value.length > 0 && !isValidEmail(value);

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:bg-zinc-900 ${
          invalid ? "border-rose-400" : "border-zinc-300 dark:border-zinc-700"
        }`}
      />
      {invalid && (
        <p className="mt-1 text-xs text-rose-500">
          メールアドレスの形式が正しくありません。例: name@example.com の形式で入力してください
        </p>
      )}
    </div>
  );
}

export function ValidationSuccessCheck() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = touched && isValidEmail(value);
  const invalid = touched && value.length > 0 && !isValidEmail(value);

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`w-full rounded-md border px-3 py-2 pr-8 text-sm focus:outline-none dark:bg-zinc-900 ${
            invalid ? "border-rose-400" : valid ? "border-emerald-400" : "border-zinc-300 dark:border-zinc-700"
          }`}
        />
        {valid && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">✓</span>
        )}
      </div>
      {invalid && (
        <p className="mt-1 text-xs text-rose-500">メールアドレスの形式が正しくありません</p>
      )}
    </div>
  );
}
