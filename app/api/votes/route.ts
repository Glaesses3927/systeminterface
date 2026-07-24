import { NextRequest } from "next/server";

type VoteType = "nice" | "bad";
type VoteCounts = { nice: number; bad: number };

const store = new Map<string, VoteCounts>();

export async function GET() {
  const result: Record<string, VoteCounts> = {};
  for (const [id, counts] of store) result[id] = counts;
  return Response.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, vote } = body as { id?: string; vote?: VoteType };

  if (!id || (vote !== "nice" && vote !== "bad")) {
    return Response.json({ error: "invalid payload" }, { status: 400 });
  }

  const current = store.get(id) ?? { nice: 0, bad: 0 };
  current[vote] += 1;
  store.set(id, current);

  return Response.json(current);
}
