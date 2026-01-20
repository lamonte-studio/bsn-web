import SeasonPlayerLeaderItem from './SeasonPlayerLeaderItem';

type Row = {
  position: number;
  player: {
    id: string;
    avatarUrl: string;
    name: string;
    team?: {
      code: string;
      name: string;
    };
  };
  statValue: number;
};

type Props = {
  title: string;
  data: Row[];
};

export default function SeasonPlayerLeadersCard({ title, data }: Props) {
  return (
    <div className="border border-[rgba(125,125,125,0.13)] flex-1 rounded-lg shadow-sm bg-[rgba(54,54,54,0.1)]">
      <div className="border-b border-gray-200 p-4">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div>
        <ul>
          {data.map((row, index) => (
            <li key={index}>
              <SeasonPlayerLeaderItem
                position={row.position}
                player={row.player}
                statValue={row.statValue}
              />
            </li>
          ))}
          {data.length === 0 && (
            <li className="p-4 text-center text-gray-500">No hay datos disponibles.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
