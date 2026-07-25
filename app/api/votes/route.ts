import { NextRequest, NextResponse } from "next/server";

type VoteType = "nice" | "bad";
type VoteCounts = { nice: number; bad: number };

const store = new Map<string, VoteCounts>();

const VOTE_COOKIE_PREFIX = "vote_";
const VOTE_MAX_AGE_SECONDS = 60 * 60 * 24; // 1日

function readVotedFromCookies(request: NextRequest) {
  const voted: Record<string, VoteType> = {};
  for (const cookie of request.cookies.getAll()) {
    if (!cookie.name.startsWith(VOTE_COOKIE_PREFIX)) continue;
    if (cookie.value !== "nice" && cookie.value !== "bad") continue;
    voted[cookie.name.slice(VOTE_COOKIE_PREFIX.length)] = cookie.value;
  }
  return voted;
}

export async function GET(request: NextRequest) {
  const counts: Record<string, VoteCounts> = {};
  for (const [id, c] of store) counts[id] = c;

  return NextResponse.json({
    counts,
    voted: readVotedFromCookies(request),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, vote } = body as { id?: string; vote?: VoteType };

  if (!id || (vote !== "nice" && vote !== "bad")) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const cookieName = `${VOTE_COOKIE_PREFIX}${id}`;
  const alreadyVoted = request.cookies.get(cookieName)?.value as
    | VoteType
    | undefined;
  const current = store.get(id) ?? { nice: 0, bad: 0 };

  if (!alreadyVoted) {
    current[vote] += 1;
    store.set(id, current);
  }

  const response = NextResponse.json({
    counts: current,
    voted: alreadyVoted ?? vote,
  });

  if (!alreadyVoted) {
    response.cookies.set(cookieName, vote, {
      maxAge: VOTE_MAX_AGE_SECONDS,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return response;
}
