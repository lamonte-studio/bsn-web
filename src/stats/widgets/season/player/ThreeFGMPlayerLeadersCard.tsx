import SeasonPlayerLeadersCard from '@/stats/components/season/leader/player/SeasonPlayerLeadersCard';

export default function ThreeFGMPlayerLeadersCard() {
  return (
    <SeasonPlayerLeadersCard
      title="3FGM por juego (ejemplo)"
      data={[
        {
          position: 1,
          player: {
            id: '1',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'John Doe',
            team: {
              name: 'Vaqueros',
              code: 'BAY',
            },
          },
          statValue: 25.4,
        },
        {
          position: 2,
          player: {
            id: '2',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Jane Smith',
            team: {
              name: 'Vaqueros',
              code: 'BAY',
            },
          },
          statValue: 23.1,
        },
        {
          position: 3,
          player: {
            id: '3',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Mike Johnson',
            team: {
              name: 'Vaqueros',
              code: 'BAY',
            },
          },
          statValue: 22.8,
        },
        {
          position: 4,
          player: {
            id: '4',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Emily Davis',
            team: {
              name: 'Vaqueros',
              code: 'BAY',
            },
          },
          statValue: 21.5,
        },
        {
          position: 5,
          player: {
            id: '5',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Chris Wilson',
            team: {
              name: 'Vaqueros',
              code: 'BAY',
            },
          },
          statValue: 20.9,
        },
      ]}
    />
  );
}
