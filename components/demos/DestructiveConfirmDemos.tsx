"use client";

import { useState } from "react";

export function NiceDestructiveConfirm() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  if (done) return <p className="text-sm text-zinc-500">(実際には削除されていません)</p>;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-rose-300 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
      >
        プロジェクトを削除
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900">
            <h4 className="text-base font-semibold text-rose-600">本当に削除しますか?</h4>
            <p className="mt-2 text-sm text-zinc-500">
              この操作は取り消せません。確認のため「DELETE」と入力してください。
            </p>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="DELETE"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600"
              >
                キャンセル
              </button>
              <button
                disabled={text !== "DELETE"}
                onClick={() => {
                  setDone(true);
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

export function BadDestructiveConfirm() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  if (done) return <p className="text-sm text-zinc-500">(実際には削除されていません)</p>;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium text-white"
      >
        プロジェクトを削除
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-72 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900">
            <p className="text-sm">削除しますか?</p>
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-zinc-500"
              >
                キャンセル
              </button>
              <button
                autoFocus
                onClick={() => {
                  setDone(true);
                  setOpen(false);
                }}
                className="rounded-md bg-rose-600 px-3 py-2 text-sm text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
