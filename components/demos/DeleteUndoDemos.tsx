"use client";

import { useEffect, useRef, useState } from "react";

export function DeleteSimpleConfirm() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  if (deleted) return <p className="text-sm text-zinc-500">(実際には削除されていません)</p>;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-rose-300 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
      >
        メモを削除
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-72 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900">
            <h4 className="text-base font-semibold">本当に削除しますか?</h4>
            <p className="mt-2 text-sm text-zinc-500">この操作は取り消せません。</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  setDeleted(true);
                  setOpen(false);
                }}
                className="flex-1 rounded-md bg-rose-600 px-3 py-2 text-sm text-white"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteTypeToConfirm() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [deleted, setDeleted] = useState(false);

  if (deleted) return <p className="text-sm text-zinc-500">(実際には削除されていません)</p>;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-rose-300 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
      >
        メモを削除
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900">
            <h4 className="text-base font-semibold text-rose-600">本当に削除しますか?</h4>
            <p className="mt-2 text-sm text-zinc-500">
              この操作は取り消せません。確認のため「削除」と入力してください。
            </p>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="削除"
              className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600"
              >
                キャンセル
              </button>
              <button
                disabled={text !== "削除"}
                onClick={() => {
                  setDeleted(true);
                  setOpen(false);
                }}
                className="flex-1 rounded-md bg-rose-600 px-3 py-2 text-sm text-white disabled:opacity-40"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteWithUndo() {
  const [deleted, setDeleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleDelete() {
    setDeleted(true);
    setShowToast(true);
    timerRef.current = setTimeout(() => setShowToast(false), 5000);
  }

  function handleUndo() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDeleted(false);
    setShowToast(false);
  }

  return (
    <div className="w-full max-w-xs">
      {deleted ? (
        <p className="rounded-md border border-dashed border-zinc-300 px-3 py-2 text-sm text-zinc-400 dark:border-zinc-700">
          メモは削除されました
        </p>
      ) : (
        <div className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700">
          買い物リスト.txt
          <button onClick={handleDelete} className="text-rose-500 hover:text-rose-600">
            削除
          </button>
        </div>
      )}
      {showToast && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-md bg-zinc-800 px-3 py-2 text-sm text-white shadow-lg">
          <span>削除しました</span>
          <button onClick={handleUndo} className="font-medium text-indigo-300 hover:text-indigo-200">
            元に戻す
          </button>
        </div>
      )}
    </div>
  );
}
