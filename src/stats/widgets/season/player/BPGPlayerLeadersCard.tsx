import SeasonPlayerLeadersCard from '@/stats/components/season/leader/player/SeasonPlayerLeadersCard';

export default function BPGPlayerLeadersCard() {
  return (
    <SeasonPlayerLeadersCard
      title="Tapones por juego (ejemplo)"
      subtitle="BPG"
      data={[
        {
          position: 1,
          player: {
            id: '1',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'John Doe',
            team: {
              name: 'Cangrejeros',
              code: 'SCE',
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
              name: 'Cangrejeros',
              code: 'SCE',
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
              name: 'Cangrejeros',
              code: 'SCE',
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
              name: 'Cangrejeros',
              code: 'SCE',
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
              name: 'Cangrejeros',
              code: 'SCE',
            },
          },
          statValue: 20.9,
        },
      ]}
    />
  );
}
