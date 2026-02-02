import LiveMatchBoxScoreBasicWidget from '@/match/client/containers/LiveMatchBoxScoreBasicWidget';
import LiveMatchPlayByPlayWidget from '@/match/client/containers/LiveMatchPlayByPlayWidget';
import CompletedMatchCardBasic from '@/match/components/card/CompletedMatchCardBasic';
import MatchInfoCard from '@/match/components/MatchInfoCard';
import CompletedMatchScoreBoard from '@/match/components/scoreboard/CompletedMatchScoreBoard';
import MatchQuarterScoreBoard from '@/match/components/scoreboard/MatchQuarterScoreBoard';
import ScheduledMatchScoreBoard from '@/match/components/scoreboard/ScheduledMatchScoreBoard';
import MatchTeamStatsComparison from '@/match/components/stats/MatchTeamStatsComparison';
import FullWidthLayout from '@/shared/components/layout/fullwidth/FullWidthLayout';
import SeasonTeamPlayerLeadersCard from '@/stats/components/season/leader/team/SeasonTeamPlayerLeadersCard';

export default function PartidoPage() {
  return (
    <FullWidthLayout>
      <section className="bg-[#0F171F]">
        <div className="container">
          <div className="mx-auto py-[32px] md:py-[42px] xl:py-[52px] lg:w-8/12 xl:w-7/12">
            <ScheduledMatchScoreBoard
              startAt="2024-07-01T19:00:00Z"
              homeTeam={{
                code: 'SCE',
                nickname: 'Cangrejeros',
                color: '#FA4515',
                city: 'Santurce',
                competitionStandings: { won: 45, lost: 20 },
              }}
              visitorTeam={{
                code: 'GBO',
                nickname: 'Mets',
                color: '#16A5BE',
                city: 'Guaynabo',
                competitionStandings: { won: 40, lost: 25 },
              }}
              venue={{ name: 'Coliseo Roberto Clemente' }}
            />
            {/* <CompletedMatchScoreBoard
              startAt="2024-06-15T19:00:00Z"
              homeTeam={{ code: "SCE", nickname: "Cangrejeros", score: "102", color: "#FA4515", city: "Santurce" }}
              visitorTeam={{ code: "GBO", nickname: "Mets", score: "99", color: "#16A5BE", city: "Guaynabo" }}
              venue={{ name: "Coliseo Roberto Clemente" }}
              overtimePeriods={2}
            /> */}
            {/* <LiveMatchScoreBoard
              startAt="2024-06-15T19:00:00Z"
              homeTeam={{ code: "SCE", nickname: "Cangrejeros", score: "102", color: "#FA4515", city: "Santurce" }}
              visitorTeam={{ code: "GBO", nickname: "Mets", score: "99", color: "#16A5BE", city: "Guaynabo" }}
              venue={{ name: "Coliseo Roberto Clemente" }}
              currentPeriod="1"
              currentTime="00:00"
              overtimePeriods={0}
            /> */}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 lg:pr-16">
              <div className="flex flex-row justify-between items-center mb-[30px]">
                <div>
                  <h3 className="text-[22px] text-black md:text-[24px]">
                    Jugadores destacados
                  </h3>
                </div>
                <div>
                  <img src="/assets/images/sponsors/coca-cola.png" alt="" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-[20px] mb-[30px] md:grid-cols-2">
                <SeasonTeamPlayerLeadersCard
                  title="Puntos por juego"
                  teamCode="SCE"
                  data={[
                    {
                      position: 1,
                      player: {
                        id: '1',
                        avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
                        name: 'John Doe',
                      },
                      statValue: 25.4,
                    },
                    {
                      position: 2,
                      player: {
                        id: '2',
                        avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
                        name: 'Jane Smith',
                      },
                      statValue: 23.1,
                    },
                    {
                      position: 3,
                      player: {
                        id: '3',
                        avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
                        name: 'Mike Johnson',
                      },
                      statValue: 22.8,
                    },
                  ]}
                />
                <SeasonTeamPlayerLeadersCard
                  title="Puntos por juego"
                  teamCode="GBO"
                  data={[
                    {
                      position: 1,
                      player: {
                        id: '1',
                        avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
                        name: 'John Doe',
                      },
                      statValue: 25.4,
                    },
                    {
                      position: 2,
                      player: {
                        id: '2',
                        avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
                        name: 'Jane Smith',
                      },
                      statValue: 23.1,
                    },
                    {
                      position: 3,
                      player: {
                        id: '3',
                        avatarUrl: 'https://dummyimage.com/60x60/ccc/fff',
                        name: 'Mike Johnson',
                      },
                      statValue: 22.8,
                    },
                  ]}
                />
              </div>

              <div className="flex flex-row justify-between items-center mb-[30px]">
                <div>
                  <h3 className="text-[22px] text-black md:text-[24px]">
                    Últimos encuentros
                  </h3>
                </div>
                <div>
                  <img src="/assets/images/sponsors/coca-cola.png" alt="" />
                </div>
              </div>
              <div
                className="flex flex-row flex-nowrap gap-3 overflow-x-auto"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                <CompletedMatchCardBasic
                  startAt="2024-07-01T19:00:00Z"
                  homeTeam={{ code: 'SCE', score: '102' }}
                  visitorTeam={{ code: 'GBO', score: '99' }}
                  overtimePeriods={1}
                />
                <CompletedMatchCardBasic
                  startAt="2024-07-01T19:00:00Z"
                  homeTeam={{ code: 'SCE', score: '94' }}
                  visitorTeam={{ code: 'GBO', score: '99' }}
                  overtimePeriods={2}
                />
                <CompletedMatchCardBasic
                  startAt="2024-07-01T19:00:00Z"
                  homeTeam={{ code: 'SCE', score: '102' }}
                  visitorTeam={{ code: 'GBO', score: '99' }}
                  overtimePeriods={1}
                />
                <CompletedMatchCardBasic
                  startAt="2024-07-01T19:00:00Z"
                  homeTeam={{ code: 'SCE', score: '102' }}
                  visitorTeam={{ code: 'GBO', score: '99' }}
                  overtimePeriods={1}
                />
                <CompletedMatchCardBasic
                  startAt="2024-07-01T19:00:00Z"
                  homeTeam={{ code: 'SCE', score: '102' }}
                  visitorTeam={{ code: 'GBO', score: '99' }}
                  overtimePeriods={1}
                />
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="mb-4">
                <MatchInfoCard
                  startAt="2024-07-01T19:00:00Z"
                  venue={{ name: 'Coliseo Roberto Clemente, San Juan, PR' }}
                  channel="BSN App  •  YouTube  •  Telemundo"
                  ticketUrl="https://www.ticketera.com"
                />
              </div>
              <div>
                <MatchTeamStatsComparison
                  homeTeam={{ code: 'SCE' }}
                  visitorTeam={{ code: 'GBO' }}
                  homeTeamBoxScore={{
                    points: 102,
                    rebounds: 45,
                    assists: 25,
                    steals: 10,
                    blocks: 8,
                    turnovers: 12,
                  }}
                  visitorTeamBoxScore={{
                    points: 99,
                    rebounds: 40,
                    assists: 22,
                    steals: 8,
                    blocks: 5,
                    turnovers: 15,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <MatchQuarterScoreBoard
          homeTeam={{
            code: 'SCE',
            nickname: 'Cangrejeros',
            competitionStandings: { won: 45, lost: 20 },
          }}
          visitorTeam={{
            code: 'CAG',
            nickname: 'Criollos',
            competitionStandings: { won: 40, lost: 25 },
          }}
          quarters={[
            {
              periodNumber: 1,
              periodType: 'REGULAR',
              homeTeam: { score: 25 },
              visitorTeam: { score: 20 },
            },
            {
              periodNumber: 2,
              periodType: 'REGULAR',
              homeTeam: { score: 30 },
              visitorTeam: { score: 28 },
            },
            {
              periodNumber: 3,
              periodType: 'REGULAR',
              homeTeam: { score: 22 },
              visitorTeam: { score: 25 },
            },
            {
              periodNumber: 4,
              periodType: 'REGULAR',
              homeTeam: { score: 25 },
              visitorTeam: { score: 26 },
            },
          ]}
        />
      </section>

      <section>
        <div className="container">
          <div className="mb-4">
            <LiveMatchPlayByPlayWidget />
          </div>
          <div>
            <LiveMatchBoxScoreBasicWidget />
          </div>
        </div>
      </section>
    </FullWidthLayout>
  );
}
