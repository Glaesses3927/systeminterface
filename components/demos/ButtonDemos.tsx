"use client";

import { useState } from "react";

export function NiceButton() {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1200);
      }}
      disabled={loading}
      className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 disabled:opacity-70"
    >
      {loading ? "送信中…" : "送信する"}
    </button>
  );
}

export function BadButton() {
  return <button className="px-5 py-2.5 text-sm text-zinc-400">送信</button>;
}
