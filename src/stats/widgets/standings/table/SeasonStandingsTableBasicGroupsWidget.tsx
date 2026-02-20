import { getClient } from '@/apollo-client';
import { STANDINGS_TABLE_BASIC } from '@/graphql/stats';
import SeasonStandingsTableBasicGroups from '@/stats/client/components/standings/SeasonStandingsTableBasicGroups';

type StandingsGroupTeam = {
  nickname: string;
  code: string;
  competitionStandings: {
    won: number;
    lost: number;
    percentageWon: number;
    homeWins: number;
    homeLosses: number;
    awayWins: number;
    awayLosses: number;
  };
};

type StandingsGroup = {
  name: string;
  teams: StandingsGroupTeam[];
};

type StandingsTableBasicResponse = {
  standings: {
    groups: StandingsGroup[];
  };
};

const fetchSeasonStandingsTableBasicGroups = async (): Promise<
  StandingsGroup[]
> => {
  const { data, error } = await getClient().query<StandingsTableBasicResponse>({
    query: STANDINGS_TABLE_BASIC,
  });

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data?.standings.groups ?? [];
};

export default async function SeasonStandingsTableBasicGroupsWidget() {
  const data: StandingsGroup[] = await fetchSeasonStandingsTableBasicGroups();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1 rounded-[12px] bg-white sm:border sm:border-[#EAEAEA] sm:shadow-[0px_1px_3px_0px_#14181F0A]">
        <div className="sm:p-[16px] xl:p-[24px]">
          <SeasonStandingsTableBasicGroups
            groups={data.map((group) => ({
              name: group.name,
              teams: group.teams.map((team) => ({
                team: {
                  code: team.code,
                  nickname: team.nickname,
                },
                pg: team.competitionStandings.won,
                pp: team.competitionStandings.lost,
                pct: team.competitionStandings.percentageWon,
              })),
            }))}
          />
        </div>
      </div>
    </div>
  );
}
