"use client";

import { useState } from "react";

export function NiceLoading() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <button
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1500);
        }}
        className="mb-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        読み込む
      </button>
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      ) : (
        <p className="text-sm text-zinc-400">ボタンを押すとスケルトン表示になります</p>
      )}
    </div>
  );
}

export function BadLoading() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-xs text-center">
      <button
        onClick={() => setLoading(true)}
        className="mb-3 rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium text-white"
      >
        読み込む
      </button>
      {loading && (
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-600" />
          <p className="text-xs text-zinc-400">終わりません(進捗も残り時間も不明)</p>
        </div>
      )}
    </div>
  );
}
