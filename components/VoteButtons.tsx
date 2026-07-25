"use client";

import { useEffect, useState } from "react";

type VoteType = "nice" | "bad";
type VoteCounts = { nice: number; bad: number };
type VotesResponse = {
  counts: Record<string, VoteCounts>;
  voted: Record<string, VoteType>;
};

export function VoteButtons({ id }: { id: string }) {
  const [counts, setCounts] = useState<VoteCounts>({ nice: 0, bad: 0 });
  const [voted, setVoted] = useState<VoteType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/votes")
      .then((res) => res.json())
      .then((data: VotesResponse) => {
        setCounts(data.counts[id] ?? { nice: 0, bad: 0 });
        setVoted(data.voted[id] ?? null);
        setLoading(false);
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
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={() => vote("nice")}
          disabled={!!voted}
          className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
            voted === "nice"
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              : "border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          } ${voted && voted !== "nice" ? "opacity-50" : ""}`}
        >
          👍 Nice
        </button>
        <button
          onClick={() => vote("bad")}
          disabled={!!voted}
          className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
            voted === "bad"
              ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
              : "border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          } ${voted && voted !== "bad" ? "opacity-50" : ""}`}
        >
          👎 Bad
        </button>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="bg-emerald-500" style={{ width: `${nicePct}%` }} />
        <div className="bg-rose-500" style={{ width: `${badPct}%` }} />
      </div>
    </div>
  );
}
