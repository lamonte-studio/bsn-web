import { getClient } from '@/apollo-client';
import { PLAYER_PROFILE } from '@/graphql/player';
import { PlayerType } from '@/player/types';
import FullWidthLayout from '@/shared/components/layout/fullwidth/FullWidthLayout';
import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';

type PlayerPageResponse = {
  player: PlayerType;
};

const fetchPlayer = async (slug: string): Promise<PlayerPageResponse> => {
  const { data, error } = await getClient().query<PlayerPageResponse>({
    query: PLAYER_PROFILE,
    variables: { geniusId: 0, providerId: slug },
  });

  if (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch player data');
  }

  const player = data?.player;

  if (player == null) {
    console.error('No player data found for slug:', slug);
    throw new Error('Player not found');
  }

  const playerPageResponse: PlayerPageResponse = {
    player,
  };

  return playerPageResponse;
};

export default async function DetalleJugadorPage({
  params,
}: PageProps<'/jugadores/[slug]'>) {
  // const { slug } = params;
  // const data: PlayerPageResponse = await fetchPlayer(slug);

  return (
    <FullWidthLayout>
      <section className="bg-[#0F171F]">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 items-center md:grid-cols-12">
            <div className="col-span-1 md:col-span-5">
              <div className="flex flex-row items-center gap-4">
                <div className="relative">
                  <figure>
                    <img
                      src="https://dummyimage.com/125x125/ccc/fff"
                      alt="Eduardo Gabriel Mojica Jr."
                      className="w-[125px] h-[125px] rounded-full border border-2 border-[#ccc]"
                    />
                  </figure>
                  <div className="absolute -bottom-2 left-0 right-0 text-center">
                    <p className="bg-[#232323] border border-[rgba(125,125,125,0.23)] inline px-2 py-0.5 rounded-[100px]">
                      <span className="font-barlow font-semibold text-[15px] text-white">
                        #15
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-1">
                    <h4 className="text-white md:text-[32px]">
                      Eduardo Gabriel Mojica Jr.
                    </h4>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <TeamLogoAvatar teamCode="SCE" size={24} />
                    <span className="font-barlow font-medium text-[15px] text-[rgba(255,255,255,0.7)]">
                      Cangrejeros
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-7">
              <div className="grid grid-cols-1 gap-[10px] md:grid-cols-4">
                <div className="border border-[rgba(255,255,255,0.2)] rounded-[12px] px-[14px] py-[12px]">
                  <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                    Puntos por juego
                  </h5>
                  <p className="text-[27px] text-white">5.2</p>
                </div>
                <div className="border border-[rgba(255,255,255,0.2)] rounded-[12px] px-[14px] py-[12px]">
                  <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                    Rebotes por juego
                  </h5>
                  <p className="text-[27px] text-white">5.2</p>
                </div>
                <div className="border border-[rgba(255,255,255,0.2)] rounded-[12px] px-[14px] py-[12px]">
                  <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                    Asistencias por juego
                  </h5>
                  <p className="text-[27px] text-white">5.2</p>
                </div>
                <div className="border border-[rgba(255,255,255,0.2)] rounded-[12px] px-[14px] py-[12px]">
                  <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                    % Tiros de campo
                  </h5>
                  <p className="text-[27px] text-white">5.2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-[24px]">
            <div className="border-b border-[rgba(255,255,255,0.07)]"></div>
          </div>
          <div className="pb-[24px] lg:w-7/12">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
              <div>
                <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                  Posición
                </h5>
                <p className="text-[18px] text-white">G</p>
              </div>
              <div>
                <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                  Altura
                </h5>
                <p className="text-[18px] text-white">6'5"</p>
              </div>
              <div>
                <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                  Peso
                </h5>
                <p className="text-[18px] text-white">220 lbs</p>
              </div>
              <div>
                <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                  Fecha de nacimiento
                </h5>
                <p className="text-[18px] text-white">01/01/1990</p>
              </div>
              <div>
                <h5 className="font-barlow-condensed text-base text-[rgba(255,255,255,0.7)]">
                  Lugar de origen
                </h5>
                <p className="text-[18px] text-white">San Juan, PR</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-6 mb-6 md:mt-[30px] md:mb-10 lg:mb-15 lg:mt-[60px]">
          <div className="container">
            <div className="flex flex-row justify-between items-center mb-[30px]">
              <div>
                <h3 className="text-[22px] text-black md:text-[24px]">
                  Estadísticas
                </h3>
              </div>
              <div>
                <p className="font-barlow text-[13px] text-[rgba(15,23,31,0.7)]">
                  Temporada 2026 • Regular
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FullWidthLayout>
  );
}
