interface UserInfo {
  name: string;
  picture: string;
}

const MatchResultValues = {
  Win: "win",
  Draw: "draw",
  Lose: "lose",
  NotFinished: "not finished",
} as const;

type MatchResult = typeof MatchResultValues[keyof typeof MatchResultValues];

export type { UserInfo, MatchResult };
