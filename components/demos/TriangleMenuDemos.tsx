"use client";

import { useRef, useState } from "react";

type SubmenuItem = { label: string; icon?: string };
type MenuItem = {
  key: string;
  label: string;
  icon: string;
  submenu?: SubmenuItem[];
};

type Point = { x: number; y: number };
type Rect = { top: number; bottom: number; left: number; right: number };

const MENU_WIDTH = 240;
const SUBMENU_WIDTH = 208;
const SUBMENU_LEFT = MENU_WIDTH + 8;
const ROW_HEIGHT = 34;
const MENU_PADDING = 6; // p-1.5
const HEADER_HEIGHT = 56;
const CANVAS_WIDTH = SUBMENU_LEFT + SUBMENU_WIDTH + 20;
const CANVAS_HEIGHT = 260;

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  profile: (
    <Icon>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 19.5c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5" />
    </Icon>
  ),
  share: (
    <Icon>
      <circle cx="18" cy="5.5" r="2.2" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="18.5" r="2.2" />
      <path d="M7.9 10.8l8.2-4.4M7.9 13.2l8.2 4.4" />
    </Icon>
  ),
  settings: (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.2 4.2l1.8 1.8M18 18l1.8 1.8M3 12h2.5M18.5 12H21M4.2 19.8l1.8-1.8M18 6l1.8-1.8" />
    </Icon>
  ),
  notices: (
    <Icon>
      <path d="M6.5 10a5.5 5.5 0 0111 0c0 3 1 4.8 1.8 5.6H4.7c.8-.8 1.8-2.6 1.8-5.6z" />
      <path d="M10 18a2 2 0 004 0" />
    </Icon>
  ),
  favorites: (
    <Icon>
      <path d="M12 3.5l2.4 5.3 5.8.6-4.3 3.9 1.2 5.7L12 16l-5.1 3 1.2-5.7-4.3-3.9 5.8-.6L12 3.5z" />
    </Icon>
  ),
  userEdit: (
    <Icon>
      <path d="M4 20l0.8-3.3L15 6.5l2.5 2.5L7.3 19.2 4 20z" />
      <path d="M13.3 8.2l2.5 2.5" />
    </Icon>
  ),
  lock: (
    <Icon>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 118 0v2.7" />
    </Icon>
  ),
  mail: (
    <Icon>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
    </Icon>
  ),
};

const MAIN_ITEMS: MenuItem[] = [
  { key: "profile", label: "プロフィール", icon: "profile" },
  {
    key: "share",
    label: "シェア",
    icon: "share",
    submenu: [
      { label: "X" },
      { label: "Instagram" },
      { label: "TikTok" },
      { label: "Facebook" },
    ],
  },
  {
    key: "settings",
    label: "設定",
    icon: "settings",
    submenu: [
      { label: "ユーザー名変更", icon: "userEdit" },
      { label: "パスワード変更", icon: "lock" },
      { label: "メール配信設定", icon: "mail" },
    ],
  },
  { key: "notices", label: "お知らせ", icon: "notices" },
  { key: "favorites", label: "お気に入り", icon: "favorites" },
];

function rowTopFor(key: string) {
  const idx = MAIN_ITEMS.findIndex((item) => item.key === key);
  return HEADER_HEIGHT + MENU_PADDING + idx * ROW_HEIGHT;
}

function rowRectFor(key: string): Rect {
  const top = rowTopFor(key);
  return { top, bottom: top + ROW_HEIGHT, left: 0, right: MENU_WIDTH };
}

function submenuRectFor(key: string): Rect {
  const item = MAIN_ITEMS.find((i) => i.key === key);
  const top = rowTopFor(key);
  const count = item?.submenu?.length ?? 0;
  return {
    top,
    bottom: top + count * ROW_HEIGHT + MENU_PADDING * 2,
    left: SUBMENU_LEFT,
    right: SUBMENU_LEFT + SUBMENU_WIDTH,
  };
}

function isInsideRect(p: Point, r: Rect) {
  return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
}

// 行とそのサブメニューを結ぶ隙間そのものを1つの矩形として扱う。
// これに入っている間は(素朴な実装でも)閉じないようにするための当たり判定。
function bridgeRectFor(key: string): Rect {
  const row = rowRectFor(key);
  const submenu = submenuRectFor(key);
  return {
    top: Math.min(row.top, submenu.top),
    bottom: Math.max(row.bottom, submenu.bottom),
    left: row.right,
    right: submenu.left,
  };
}

function isInOwnZone(point: Point, key: string) {
  return (
    isInsideRect(point, rowRectFor(key)) ||
    isInsideRect(point, bridgeRectFor(key)) ||
    isInsideRect(point, submenuRectFor(key))
  );
}

function rowClassName(active: boolean) {
  return `flex cursor-default items-center justify-between rounded-md px-3 py-1.5 text-sm ${
    active
      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
  }`;
}

function MenuHeader() {
  return (
    <div
      className="flex items-center gap-2 border-b border-zinc-100 px-3 dark:border-zinc-800"
      style={{ height: HEADER_HEIGHT, boxSizing: "border-box" }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white shadow-sm">
        A
      </div>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Acme
        </p>
        <p className="truncate text-xs text-zinc-400">Workspace</p>
      </div>
    </div>
  );
}

function MainList({ activeKey }: { activeKey: string | null }) {
  return (
    <div
      className="absolute left-0 top-0 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
      style={{ width: MENU_WIDTH }}
    >
      <MenuHeader />
      <ul className="p-1.5">
        {MAIN_ITEMS.map((item) => (
          <li
            key={item.key}
            className={rowClassName(item.key === activeKey)}
            style={{ height: ROW_HEIGHT, boxSizing: "border-box" }}
          >
            <span className="flex items-center gap-2">
              {ICONS[item.icon]}
              {item.label}
            </span>
            {item.submenu && <span className="text-xs text-zinc-400">›</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubmenuList({ activeKey }: { activeKey: string }) {
  const item = MAIN_ITEMS.find((i) => i.key === activeKey);
  if (!item?.submenu) return null;
  return (
    <ul
      className="absolute rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
      style={{ left: SUBMENU_LEFT, top: rowTopFor(activeKey), width: SUBMENU_WIDTH }}
    >
      {item.submenu.map((sub) => (
        <li
          key={sub.label}
          className="flex items-center gap-2 rounded-md px-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
          style={{ height: ROW_HEIGHT, boxSizing: "border-box" }}
        >
          {sub.icon && ICONS[sub.icon]}
          {sub.label}
        </li>
      ))}
    </ul>
  );
}

export function NiceTriangleMenu() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showCone, setShowCone] = useState(false);
  const [cursor, setCursor] = useState<Point | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const prevPoint = useRef<Point | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    if (closeTimer.current) return;
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      setActiveKey(null);
    }, 120);
  }

  // 直近の移動方向をそのまま延長し、サブメニューの左端(=当たり判定の底辺)を
  // 通過するときのY座標がサブメニューの高さの範囲に収まるかどうかで判定する。
  // これが「カーソルとサブメニュー上端・下端を結ぶ三角形」の内側にいるかの判定そのもの。
  function isHeadingTowardSubmenu(prev: Point | null, curr: Point, rect: Rect) {
    if (!prev) return false;
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    if (dx <= 0.5) return false;
    const t = (rect.left - curr.x) / dx;
    if (t < 0) return false;
    const yAtEdge = curr.y + dy * t;
    return yAtEdge >= rect.top - 6 && yAtEdge <= rect.bottom + 6;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    const point = { x: e.clientX - container.left, y: e.clientY - container.top };

    if (activeKey && isInOwnZone(point, activeKey)) {
      clearCloseTimer();
      setCursor(point);
      prevPoint.current = point;
      return;
    }

    const hoveredItem = MAIN_ITEMS.find((item) => isInsideRect(point, rowRectFor(item.key)));

    if (hoveredItem?.submenu) {
      if (!activeKey) {
        setActiveKey(hoveredItem.key);
        clearCloseTimer();
      } else {
        const heading = isHeadingTowardSubmenu(
          prevPoint.current,
          point,
          submenuRectFor(activeKey),
        );
        if (heading) {
          clearCloseTimer();
        } else {
          setActiveKey(hoveredItem.key);
          clearCloseTimer();
        }
      }
    } else if (activeKey) {
      const heading = isHeadingTowardSubmenu(
        prevPoint.current,
        point,
        submenuRectFor(activeKey),
      );
      if (heading) {
        clearCloseTimer();
      } else {
        scheduleClose();
      }
    }

    setCursor(point);
    prevPoint.current = point;
  }

  function handleMouseLeave() {
    setCursor(null);
    scheduleClose();
  }

  const activeSubmenuRect = activeKey ? submenuRectFor(activeKey) : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        <MainList activeKey={activeKey} />
        {activeKey && <SubmenuList activeKey={activeKey} />}
        {activeKey && showCone && cursor && activeSubmenuRect && (
          <svg
            className="pointer-events-none absolute left-0 top-0"
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          >
            <polygon
              points={`${cursor.x},${cursor.y} ${activeSubmenuRect.left},${activeSubmenuRect.top} ${activeSubmenuRect.left},${activeSubmenuRect.bottom}`}
              fill="rgb(99 102 241 / 0.12)"
              stroke="rgb(99 102 241)"
              strokeDasharray="4 3"
              strokeWidth={1.5}
            />
            {[
              { x: cursor.x, y: cursor.y },
              { x: activeSubmenuRect.left, y: activeSubmenuRect.top },
              { x: activeSubmenuRect.left, y: activeSubmenuRect.bottom },
            ].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4} fill="rgb(99 102 241)" />
            ))}
          </svg>
        )}
      </div>

      <label className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={showCone}
          onChange={(e) => setShowCone(e.target.checked)}
          className="h-3.5 w-3.5 rounded border-zinc-300"
        />
        当たり判定の三角形を表示
      </label>
    </div>
  );
}

// 素朴な実装: 行・行とサブメニューの間の隙間・サブメニュー自体のいずれかに
// マウスがある間は開いたままにする(隙間だけを理由に閉じることはない)。
// ただし軌道判定は行わないため、隙間を大きく外れて別の行の上を経由するような
// 斜め移動をすると、その時点で別の項目に切り替わるか閉じてしまう。
export function BadTriangleMenu() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    const point = { x: e.clientX - container.left, y: e.clientY - container.top };

    if (activeKey && isInOwnZone(point, activeKey)) return;

    const hoveredItem = MAIN_ITEMS.find((item) => isInsideRect(point, rowRectFor(item.key)));

    if (hoveredItem?.submenu) {
      if (hoveredItem.key !== activeKey) setActiveKey(hoveredItem.key);
      return;
    }

    if (activeKey) setActiveKey(null);
  }

  function handleMouseLeave() {
    setActiveKey(null);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        <MainList activeKey={activeKey} />
        {activeKey && <SubmenuList activeKey={activeKey} />}
      </div>
      <p className="text-xs text-zinc-400">
        軌道判定なし。行とサブメニューの隙間自体では閉じないが、
        別の行の上を経由するような斜め移動をすると切り替わったり閉じたりする
      </p>
    </div>
  );
}
