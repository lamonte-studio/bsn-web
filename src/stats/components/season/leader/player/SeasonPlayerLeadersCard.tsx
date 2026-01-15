import SeasonLeaderPlayerItem from "./SeasonLeaderPlayerItem";

type Row = {
  player: {
    id: string;
    avatarUrl: string;
    name: string;
    position: string;
    jerseyNumber: string;
  };
  statValue: number;
};

type Props = {
  title: string;
  data: Row[];
};

export default function SeasonPlayerLeadersCard({ title, data }: Props) {
  return (
    <div className="border border-gray-200 flex-1 rounded-lg shadow-sm bg-white">
      <div className="border-b border-gray-200 p-4">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div>
        <ul>
          {data.map((row, index) => (
            <li key={index}>
              <SeasonLeaderPlayerItem player={row.player} statValue={row.statValue} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
