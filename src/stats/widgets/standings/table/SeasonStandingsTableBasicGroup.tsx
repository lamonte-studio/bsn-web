import SeasonStandingsTableBasic from '@/stats/components/season/standings/table/SeasonStandingsTableBasic';

type Props = {
  group: string;
};

export default function SeasonStandingsTableBasicGroup({ group }: Props) {
  return (
    <SeasonStandingsTableBasic
      data={[
        {
          team: {
            code: 'SCE',
            name: 'Cangrejeros',
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
            name: 'Vaqueros',
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
            name: 'Osos',
          },
          pg: 10,
          pp: 5,
          pct: 0.667,
          loc: '6-2',
          vis: '4-3',
        },
      ]}
    />
  );
}
