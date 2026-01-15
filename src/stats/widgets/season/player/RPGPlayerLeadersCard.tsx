import SeasonPlayerLeadersCard from '@/stats/components/season/leader/player/SeasonPlayerLeadersCard';

export default function RPGPlayerLeadersCard() {
  return (
    <SeasonPlayerLeadersCard
      title="Rebotes por juego"
      data={[
        {
          player: {
            id: '1',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'John Doe',
            position: 'PG',
            jerseyNumber: '12',
          },
          statValue: 25.4,
        },
        {
          player: {
            id: '2',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Jane Smith',
            position: 'SG',
            jerseyNumber: '8',
          },
          statValue: 23.1,
        },
        {
          player: {
            id: '3',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Mike Johnson',
            position: 'SF',
            jerseyNumber: '34',
          },
          statValue: 22.8,
        },
        {
          player: {
            id: '4',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Emily Davis',
            position: 'PF',
            jerseyNumber: '21',
          },
          statValue: 21.5,
        },
        {
          player: {
            id: '5',
            avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
            name: 'Chris Wilson',
            position: 'C',
            jerseyNumber: '55',
          },
          statValue: 20.9,
        },
      ]}
    />
  );
}
