type Row = {
  team: {
    code: string;
    name: string;
  },
  pg: number;
  pp: number;
  pct: number;
  loc: string;
  vis: string;
}

type Props = {
  data: Row[];
};

export default function SeasonStandingsTableBasic({ data }: Props) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th>Equipo</th>
          <th>PG</th>
          <th>PP</th>
          <th>PCT</th>
          <th>LOC</th>
          <th>VIS</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.team.code}>
            <td className="border border-gray-300 px-2 py-1">{row.team.name}</td>
            <td className="border border-gray-300 px-2 py-1">{row.pg}</td>
            <td className="border border-gray-300 px-2 py-1">{row.pp}</td>
            <td className="border border-gray-300 px-2 py-1">{row.pct.toFixed(3)}</td>
            <td className="border border-gray-300 px-2 py-1">{row.loc}</td>
            <td className="border border-gray-300 px-2 py-1">{row.vis}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
