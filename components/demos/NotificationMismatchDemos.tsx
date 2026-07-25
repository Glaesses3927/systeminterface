"use client";

import { useEffect, useRef, useState } from "react";

export function NotificationModalForLowPriority() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-xs text-center">
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        テーマを変更する
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-72 rounded-lg bg-white p-5 text-left shadow-xl dark:bg-zinc-900">
            <h4 className="text-base font-semibold">テーマが更新されました</h4>
            <p className="mt-2 text-sm text-zinc-500">
              新しいテーマ「ダーク」が適用されました。再度変更するには、設定画面の「テーマ」から変更してください。
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function NotificationToastForHighPriority() {
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function trigger() {
    setShowToast(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowToast(false), 2500);
  }

  return (
    <div className="w-full max-w-xs text-center">
      <button
        onClick={trigger}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        決済を実行する
      </button>
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 max-w-xs rounded-md bg-zinc-800 px-3 py-2 text-left text-sm text-white shadow-lg">
          支払いに失敗しました。カード情報を確認してください。（予約はできていません。ご注意ください。）
        </div>
      )}
    </div>
  );
}
