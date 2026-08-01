import { NextRequest, NextResponse } from "next/server";
import { dataClient } from "@/lib/amplifyClient";

type VoteType = "nice" | "bad";
type VoteCounts = { nice: number; bad: number };

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
  const { data: votes } = await dataClient.models.ComponentVote.list();
  const counts: Record<string, VoteCounts> = {};
  for (const vote of votes) {
    counts[vote.componentId] = { nice: vote.nice ?? 0, bad: vote.bad ?? 0 };
  }

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

  const { data: existing } = await dataClient.models.ComponentVote.get({
    componentId: id,
  });
  let current: VoteCounts = {
    nice: existing?.nice ?? 0,
    bad: existing?.bad ?? 0,
  };

  if (!alreadyVoted) {
    current = { ...current, [vote]: current[vote] + 1 };
    if (existing) {
      await dataClient.models.ComponentVote.update({
        componentId: id,
        nice: current.nice,
        bad: current.bad,
      });
    } else {
      await dataClient.models.ComponentVote.create({
        componentId: id,
        nice: current.nice,
        bad: current.bad,
      });
    }
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
