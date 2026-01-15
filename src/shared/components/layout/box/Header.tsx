import Link from 'next/link';

export default function HeaderBoxLayout() {
  return (
    <div>
      <div className="container">
        <div className="flex flex-row justify-between">
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <ul className="flex flex-row space-x-4">
              <li>
                <Link href="/playoffs">Playoffs</Link>
              </li>
              <li>
                <Link href="/calendario">Calendario</Link>
              </li>
              <li>
                <Link href="/noticias">Noticias</Link>
              </li>
              <li>
                <span>Equipos</span>
                <ul>
                  <li>
                    <Link href="/equipos/agu">Criollos</Link>
                  </li>
                  <li>
                    <Link href="/equipos/sce">Cangrejeros</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/jugadores">Jugadores</Link>
              </li>
              <li>
                <Link href="/estadisticas">Estadísticas</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-row space-x-4">
              <li>
                <a href="#">facebook</a>
              </li>
              <li>
                <a href="#">x</a>
              </li>
              <li>
                <a href="#">instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
