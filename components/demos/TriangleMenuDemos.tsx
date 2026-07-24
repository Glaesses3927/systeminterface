"use client";

import { useRef, useState } from "react";

const SUBITEMS = ["ノートPC", "デスクトップ", "モニター", "キーボード"];

export function NiceTriangleMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white">
        パソコン ▾
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 w-48 pt-2">
          <div
            className="absolute -top-2 left-0 h-4 w-full bg-indigo-400/30"
            style={{ clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)" }}
          />
          <ul className="rounded-md border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            {SUBITEMS.map((item) => (
              <li
                key={item}
                className="rounded px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-24 w-48 text-xs text-zinc-400">
        斜めに移動しても閉じにくい(三角ブリッジ+遅延クローズ)
      </p>
    </div>
  );
}

export function BadTriangleMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        パソコン ▾
      </button>
      {open && (
        <ul className="absolute left-0 top-[calc(100%+8px)] z-10 w-48 rounded-md border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {SUBITEMS.map((item) => (
            <li
              key={item}
              className="rounded px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-24 w-48 text-xs text-zinc-400">
        ボタンから離れると即座に閉じる(隙間あり・当たり判定なし)
      </p>
    </div>
  );
}
