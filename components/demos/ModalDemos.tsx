"use client";

import { useEffect, useState } from "react";

export function NiceModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        モーダルを開く
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-80 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="閉じる"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              ✕
            </button>
            <h4 className="text-base font-semibold">お知らせ</h4>
            <p className="mt-2 text-sm text-zinc-500">
              Escキー・外側クリック・✕ボタンのいずれでも閉じられます。
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export function BadModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        モーダルを開く
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-80 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900">
            <h4 className="text-base font-semibold">限定オファー!</h4>
            <p className="mt-2 text-sm text-zinc-500">
              このモーダルはEscでも外側クリックでも閉じません。閉じるボタンを探してください。
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-label="閉じる"
              className="absolute right-1 top-1 h-3 w-3 text-[8px] text-zinc-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
