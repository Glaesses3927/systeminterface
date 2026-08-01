"use client";

import { useState } from "react";

export function LoadingSpinnerOnly() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function start() {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  }

  return (
    <div className="w-full max-w-xs text-left">
      <button
        onClick={start}
        className="mb-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        読み込む
      </button>
      {loading && (
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-indigo-600" />
        </div>
      )}
      {done && <p className="text-sm text-zinc-600 dark:text-zinc-300">記事のタイトルと本文がここに表示されます。</p>}
    </div>
  );
}

export function LoadingSkeletonOnly() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function start() {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  }

  return (
    <div className="w-full max-w-xs">
      <button
        onClick={start}
        className="mb-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        読み込む
      </button>
      {loading && (
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      )}
      {done && (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          記事のタイトルと本文がここに表示されます。
        </p>
      )}
    </div>
  );
}
