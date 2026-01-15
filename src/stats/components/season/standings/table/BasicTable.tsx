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

export default function SeasonStandingsBasicTable({ data }: Props) {
  return (
    <table>
      <thead>
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
            <td>{row.team.name}</td>
            <td>{row.pg}</td>
            <td>{row.pp}</td>
            <td>{row.pct.toFixed(3)}</td>
            <td>{row.loc}</td>
            <td>{row.vis}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
