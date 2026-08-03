"use client";

import { useEffect, useState } from "react";

function validateEmail(value: string) {
  if (value.length === 0) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "正しいメールアドレスを入力してください";
  return null;
}

const fieldClass =
  "w-full rounded-md border px-3 py-2 pr-8 text-sm focus:outline-none dark:bg-zinc-900";

export function ValidationOnKeystroke() {
  const [value, setValue] = useState("");
  const error = validateEmail(value);
  const valid = value.length > 0 && !error;
  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${fieldClass} ${
            error ? "border-rose-400" : valid ? "border-emerald-400" : "border-zinc-300 dark:border-zinc-700"
          }`}
        />
        {valid && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">✓</span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export function ValidationOnBlur() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const error = touched ? validateEmail(value) : null;
  const valid = touched && value.length > 0 && !error;
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
          className={`${fieldClass} ${
            error ? "border-rose-400" : valid ? "border-emerald-400" : "border-zinc-300 dark:border-zinc-700"
          }`}
        />
        {valid && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">✓</span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export function ValidationOnDebounce() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
    const timer = setTimeout(() => {
      setError(validateEmail(value));
      setChecked(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [value]);

  const valid = checked && value.length > 0 && !error;

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${fieldClass} ${
            checked && error ? "border-rose-400" : valid ? "border-emerald-400" : "border-zinc-300 dark:border-zinc-700"
          }`}
        />
        {valid && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">✓</span>
        )}
      </div>
      {checked && error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export function ValidationOnSubmit() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ error: string | null; submitted: boolean }>({
    error: null,
    submitted: false,
  });
  const valid = result.submitted && value.length > 0 && !result.error;

  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メールアドレス
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setResult({ error: null, submitted: false });
          }}
          className={`${fieldClass} ${
            result.submitted && result.error
              ? "border-rose-400"
              : valid
                ? "border-emerald-400"
                : "border-zinc-300 dark:border-zinc-700"
          }`}
        />
        {valid && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500">✓</span>
        )}
      </div>
      {result.submitted && result.error && (
        <p className="mt-1 text-xs text-rose-500">{result.error}</p>
      )}
      <button
        onClick={() => setResult({ error: validateEmail(value), submitted: true })}
        className="mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white"
      >
        送信
      </button>
    </div>
  );
}
