"use client";

import { useEffect, useState } from "react";

type VoteType = "nice" | "bad";
type VoteCounts = { nice: number; bad: number };
type VotesResponse = {
  counts: Record<string, VoteCounts>;
  voted: Record<string, VoteType>;
};

function ThumbIcon({ down = false }: { down?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={down ? "rotate-180" : ""}
    >
      <path d="M7 10v10H4V10h3zm0 0l4.5-7a2 2 0 0 1 3.6 1.2L14.5 8H18a2 2 0 0 1 2 2.3l-1.2 8A2 2 0 0 1 16.8 20H7" />
    </svg>
  );
}

export function VoteButtons({ id }: { id: string }) {
  const [counts, setCounts] = useState<VoteCounts>({ nice: 0, bad: 0 });
  const [voted, setVoted] = useState<VoteType | null>(null);

  useEffect(() => {
    fetch("/api/votes")
      .then((res) => res.json())
      .then((data: VotesResponse) => {
        setCounts(data.counts[id] ?? { nice: 0, bad: 0 });
        setVoted(data.voted[id] ?? null);
      });
  }, [id]);

  async function vote(type: VoteType) {
    if (voted) return;
    setVoted(type);

    const res = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, vote: type }),
    });
    const data: { counts: VoteCounts; voted: VoteType } = await res.json();
    setCounts(data.counts);
    setVoted(data.voted);
  }

  const total = counts.nice + counts.bad;
  const nicePct = total ? Math.round((counts.nice / total) * 100) : 50;
  const badPct = 100 - nicePct;

  return (
    <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
      <div className="flex overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
        <button
          onClick={() => vote("nice")}
          disabled={!!voted}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-[13px] font-medium transition-colors ${
            voted === "nice"
              ? "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400"
              : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
          } ${voted && voted !== "nice" ? "opacity-40" : ""}`}
        >
          <ThumbIcon />
          Nice
        </button>
        <div className="w-px bg-zinc-200 dark:bg-zinc-700" />
        <button
          onClick={() => vote("bad")}
          disabled={!!voted}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-[13px] font-medium transition-colors ${
            voted === "bad"
              ? "bg-rose-600/10 text-rose-700 dark:text-rose-400"
              : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
          } ${voted && voted !== "bad" ? "opacity-40" : ""}`}
        >
          <ThumbIcon down />
          Bad
        </button>
      </div>
      <div className="mt-2 flex h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="bg-emerald-600/70" style={{ width: `${nicePct}%` }} />
        <div className="bg-rose-600/70" style={{ width: `${badPct}%` }} />
      </div>
    </div>
  );
}
