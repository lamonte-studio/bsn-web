'use client';

import SeasonStandingsTableBasicGroup from '@/stats/widgets/standings/table/SeasonStandingsTableBasicGroup';
import { useState } from 'react';

export default function SeasonStandingsTableBasicCard() {
  const [group, setGroup] = useState<string>('A');
  return (
    <div>
      <div>
        <h2>Tabla de posiciones</h2>
      </div>
      <ul className="flex flex-row gap-4 mb-4">
        <li>
          <button
            onClick={() => {
              setGroup('A');
            }}
          >
            Grupo A
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setGroup('B');
            }}
          >
            Grupo B
          </button>
        </li>
      </ul>
      <div>
        {group === 'A' && <SeasonStandingsTableBasicGroup group="A" />}
        {group === 'B' && <SeasonStandingsTableBasicGroup group="B" />}
      </div>
    </div>
  );
}
