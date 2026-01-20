import SeasonPlayerLeadersCard from '@/stats/components/season/leader/player/SeasonPlayerLeadersCard';
import graphqlClient from '@/graphql-client';
import { SEASON_TOP_PLAYER_LEADER_STATS_BY_CATEGORY } from '@/graphql/stats';
import { TopPlayerLeaderStatsType } from '@/stats/types';

const ITEMS_PER_PAGE = 5;

const fetchTopPlayerLeaders = async (): Promise<TopPlayerLeaderStatsType[]> => {
  const { data, error } = await graphqlClient.query({
    query: SEASON_TOP_PLAYER_LEADER_STATS_BY_CATEGORY,
    variables: { statsCode: 'ASSISTS_AVG', first: ITEMS_PER_PAGE },
  });

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data.seasonPlayerStatsConnection.edges.map(
    (edge: { node: TopPlayerLeaderStatsType }) => edge.node,
  );
};

export default async function APGPlayerLeadersCard() {
  const data: TopPlayerLeaderStatsType[] = await fetchTopPlayerLeaders();
  return (
    <SeasonPlayerLeadersCard
      title="Asistencias por juego"
      data={data.map((item, index) => ({
        position: index + 1,
        player: {
          id: item.player.providerId,
          avatarUrl: item.player.avatarUrl,
          name: item.player.name,
          team: {
            code: item.player.teamCode,
            name: item.player.teamName,
          },
        },
        statValue: item.value,
      }))}
    />
  );
}
