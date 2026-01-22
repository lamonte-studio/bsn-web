export type MatchTeamCompetitorType = {
  code: string;
  name: string;
  nickname: string;
  city: string;
  score: string;
  competitionStandings?: {
    won: number;
    lost: number;
  },
  ticketUrl?: string;
}

export type MatchType = {
  startAt: string;
  homeTeam: MatchTeamCompetitorType;
  visitorTeam: MatchTeamCompetitorType;
  providerId: string;
  status: string;
  overtimePeriods?: number;
  currentPeriod?: string;
  currentTime?: string;
  youtube?: string;
  channel?: string;
  streamUrl?: string;
  ticketUrl?: string;
  mediaProvider?: string;
  isFinals?: boolean;
  finalsDescription?: string;
};
