"use client";

import { useState } from "react";

type Choice = "accepted" | "rejected" | null;

export function NiceCookieConsent() {
  const [choice, setChoice] = useState<Choice>(null);
  if (choice) {
    return (
      <p className="text-sm text-zinc-500">
        選択: {choice === "accepted" ? "同意しました" : "拒否しました"}
      </p>
    );
  }
  return (
    <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <p className="mb-3 text-zinc-600 dark:text-zinc-300">
        サイト改善のためCookieを使用します。よろしいですか?
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setChoice("accepted")}
          className="flex-1 rounded-md bg-indigo-600 px-3 py-2 font-medium text-white"
        >
          同意する
        </button>
        <button
          onClick={() => setChoice("rejected")}
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-200"
        >
          拒否する
        </button>
      </div>
    </div>
  );
}

export function BadCookieConsent() {
  const [choice, setChoice] = useState<Choice>(null);
  if (choice) {
    return (
      <p className="text-sm text-zinc-500">
        選択: {choice === "accepted" ? "同意しました" : "拒否しました"}
      </p>
    );
  }
  return (
    <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <p className="mb-3 text-zinc-600 dark:text-zinc-300">
        パーソナライズ広告・分析・おすすめ商品の表示のためCookieの使用に同意すると、より良い体験をお届けできます!
      </p>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => setChoice("accepted")}
          className="w-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-3 font-bold text-white shadow-md"
        >
          はい、体験を向上させる
        </button>
        <button
          onClick={() => setChoice("rejected")}
          className="text-xs text-zinc-400 underline"
        >
          いいえ、体験を下げてもいい
        </button>
      </div>
    </div>
  );
}
