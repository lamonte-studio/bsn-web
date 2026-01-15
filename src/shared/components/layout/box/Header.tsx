import Link from 'next/link';

export default function HeaderBoxLayout() {
  return (
    <div>
      <div className="container">
        <div className="flex flex-row justify-between">
          <div>
            <Link href="/" className="text-blue-500 hover:underline">Home</Link>
          </div>
          <div>
            <ul className="flex flex-row space-x-4">
              <li>
                <Link href="/playoffs" className="text-blue-500 hover:underline">Playoffs</Link>
              </li>
              <li>
                <Link href="/calendario" className="text-blue-500 hover:underline">Calendario</Link>
              </li>
              <li>
                <Link href="/noticias" className="text-blue-500 hover:underline">Noticias</Link>
              </li>
              <li>
                <span>Equipos</span>
                <ul>
                  <li>
                    <Link href="/equipos/agu" className="text-blue-500 hover:underline">Criollos</Link>
                  </li>
                  <li>
                    <Link href="/equipos/sce" className="text-blue-500 hover:underline">Cangrejeros</Link>
                  </li>
                  <li>
                    <Link href="/equipos/bay" className="text-blue-500 hover:underline">Vaqueros</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/jugadores" className="text-blue-500 hover:underline">Jugadores</Link>
              </li>
              <li>
                <Link href="/estadisticas" className="text-blue-500 hover:underline">Estadísticas</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-row space-x-4">
              <li>
                <a href="#" className="text-blue-500 hover:underline">facebook</a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">x</a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
