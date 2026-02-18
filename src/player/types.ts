export type PlayerType = {
  providerId: string;
  name: string;
  nickname: string;
  avatarUrl: string;
  playingPosition: string;
  height: number;
  weight: number;
  dob: string;
  nationality: string;
  shirtNumber: number;
  team: {
    code: string;
    name: string;
    nickname: string;
  };
  stats?: {
    pointsAvg: number;
    reboundsTotalAvg: number;
    assistsAvg: number;
    fieldGoalsPercentage: number;
  };
};
