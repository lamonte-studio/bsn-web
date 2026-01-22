import SeasonStandingsTableBasic from '@/stats/components/season/standings/table/SeasonStandingsTableBasic';
import { getClient } from '@/apollo-client';
import { STANDINGS_TABLE_BASIC } from '@/graphql/stats';

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

export default async function SeasonStandingsTableBasicGroups() {
  const data: StandingsGroup[] = await fetchSeasonStandingsTableBasicGroups();
  return (
    <div>
      <div className="flex flex-col gap-8">
        {data.map((group, index) => (
          <SeasonStandingsTableBasic
            key={`table-positions-${group.name}`}
            group={group.name}
            data={group.teams.map((team) => ({
              team: {
                code: team.code,
                nickname: team.nickname,
              },
              pg: team.competitionStandings.won,
              pp: team.competitionStandings.lost,
              pct: team.competitionStandings.percentageWon,
              loc: `${team.competitionStandings.homeWins}-${team.competitionStandings.homeLosses}`,
              vis: `${team.competitionStandings.awayWins}-${team.competitionStandings.awayLosses}`,
            }))}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        <SeasonStandingsTableBasic
          group="Grupo A (ejemplo)"
          data={[
            {
              team: {
                code: 'SCE',
                nickname: 'Cangrejeros',
              },
              pg: 10,
              pp: 5,
              pct: 0.667,
              loc: '6-2',
              vis: '4-3',
            },
            {
              team: {
                code: 'BAY',
                nickname: 'Vaqueros',
              },
              pg: 10,
              pp: 5,
              pct: 0.667,
              loc: '6-2',
              vis: '4-3',
            },
            {
              team: {
                code: 'MAY',
                nickname: 'Osos',
              },
              pg: 10,
              pp: 5,
              pct: 0.667,
              loc: '6-2',
              vis: '4-3',
            },
          ]}
        />
        <SeasonStandingsTableBasic
          group="Grupo B (ejemplo)"
          data={[
            {
              team: {
                code: 'CAG',
                nickname: 'Criollos',
              },
              pg: 10,
              pp: 5,
              pct: 0.667,
              loc: '6-2',
              vis: '4-3',
            },
            {
              team: {
                code: 'PON',
                nickname: 'Leones',
              },
              pg: 10,
              pp: 5,
              pct: 0.667,
              loc: '6-2',
              vis: '4-3',
            },
            {
              team: {
                code: 'MAY',
                nickname: 'Indios',
              },
              pg: 10,
              pp: 5,
              pct: 0.667,
              loc: '6-2',
              vis: '4-3',
            },
          ]}
        />
      </div>
    </div>
  );
}
