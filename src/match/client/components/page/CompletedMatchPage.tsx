'use client';

import { DEFAULT_MEDIA_PROVIDER } from '@/constants';
import MatchInfoCard from '@/match/components/MatchInfoCard';
import CompletedMatchScoreBoard from '@/match/components/scoreboard/CompletedMatchScoreBoard';
import MatchQuarterScoreBoard from '@/match/components/scoreboard/MatchQuarterScoreBoard';
import { MatchType } from '@/match/types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import MatchBoxScoreWidget from '../../containers/MatchBoxScoreWidget';
import MatchPlayerLeadersCard from '@/stats/components/season/leader/player/MatchPlayerLeadersCard';

type MatchPlayerBoxScore = {
  player: {
    providerId: string;
    name: string;
    avatarUrl: string;
    team?: {
      code: string;
      name: string;
    };
  };
  boxscore: {
    points: number;
    reboundsTotal: number;
    assists: number;
    steals: number;
    blocks: number;
    threePointersMade: number;
  };
};

type Props = {
  match: MatchType;
  pointsLeaders?: MatchPlayerBoxScore[];
  reboundsLeaders?: MatchPlayerBoxScore[];
  assistsLeaders?: MatchPlayerBoxScore[];
  stealsLeaders?: MatchPlayerBoxScore[];
  blocksLeaders?: MatchPlayerBoxScore[];
  threePointersMadeLeaders?: MatchPlayerBoxScore[];
};

export default function CompletedMatchPage({
  match,
  pointsLeaders = [],
  reboundsLeaders = [],
  assistsLeaders = [],
  stealsLeaders = [],
  blocksLeaders = [],
  threePointersMadeLeaders = [],
}: Props) {
  return (
    <>
      <section className="bg-[#0F171F]">
        <div className="container">
          <div className="mx-auto py-[32px] md:py-[42px] xl:py-[52px] lg:w-9/12 xl:w-8/12">
            <CompletedMatchScoreBoard
              startAt={match.startAt}
              homeTeam={{
                code: match.homeTeam.code,
                nickname: match.homeTeam.nickname,
                score: match.homeTeam.score,
                city: match.homeTeam.city,
                color: match.homeTeam.color,
              }}
              visitorTeam={{
                code: match.visitorTeam.code,
                nickname: match.visitorTeam.nickname,
                score: match.visitorTeam.score,
                city: match.visitorTeam.city,
                color: match.visitorTeam.color,
              }}
              venue={{ name: match.venue?.name ?? '' }}
              overtimePeriods={match.overtimePeriods}
            />
          </div>
        </div>
      </section>
      <TabGroup>
        <TabList className="bg-[#0F171F] pb-[28px]">
          <div className="container text-center space-x-[30px]">
            <Tab className="outline-none py-[8px] text-[rgba(255,255,255,0.5)] text-[22px] data-selected:text-white data-selected:border-b data-selected:border-b-white">
              Resumen
            </Tab>
            <Tab className="outline-none py-[8px] text-[rgba(255,255,255,0.5)] text-[22px] data-selected:text-white data-selected:border-b data-selected:border-b-white">
              Box Score
            </Tab>
          </div>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 lg:pr-16">
                  <div className="mb-6 md:mb-10 lg:mb-15">
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <h3 className="text-[22px] text-black md:text-[24px]">
                          Resultado
                        </h3>
                      </div>
                    </div>
                    <MatchQuarterScoreBoard
                      homeTeam={{
                        code: match.homeTeam.code,
                        nickname: match.homeTeam.nickname,
                        competitionStandings: {
                          won: match.homeTeam.competitionStandings?.won ?? 0,
                          lost: match.homeTeam.competitionStandings?.lost ?? 0,
                        },
                      }}
                      visitorTeam={{
                        code: match.visitorTeam.code,
                        nickname: match.visitorTeam.nickname,
                        competitionStandings: {
                          won: match.visitorTeam.competitionStandings?.won ?? 0,
                          lost:
                            match.visitorTeam.competitionStandings?.lost ?? 0,
                        },
                      }}
                      quarters={
                        match.periods?.map((period) => ({
                          periodNumber: period.periodNumber,
                          periodType: period.periodType,
                          homeTeam: { score: period.homeTeam.score },
                          visitorTeam: { score: period.visitorTeam.score },
                        })) ?? []
                      }
                    />
                  </div>
                  <div className="mb-6 md:mb-10 lg:mb-15">
                    <div className="flex flex-row justify-between items-center mb-6 md:mb-[28px]">
                      <div>
                        <h3 className="text-[22px] text-black md:text-[24px]">
                          Líderes del juego
                        </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <MatchPlayerLeadersCard
                        title="Puntos"
                        data={pointsLeaders.map((leader, index) => ({
                          position: index + 1,
                          player: {
                            id: leader.player.providerId,
                            avatarUrl: leader.player.avatarUrl,
                            name: leader.player.name,
                            team: {
                              code: leader.player.team?.code ?? '',
                              name: leader.player.team?.name ?? '',
                            },
                          },
                          statValue: leader.boxscore.points,
                        }))}
                      />
                      <MatchPlayerLeadersCard
                        title="Rebotes"
                        data={reboundsLeaders.map((leader, index) => ({
                          position: index + 1,
                          player: {
                            id: leader.player.providerId,
                            avatarUrl: leader.player.avatarUrl,
                            name: leader.player.name,
                            team: {
                              code: leader.player.team?.code ?? '',
                              name: leader.player.team?.name ?? '',
                            },
                          },
                          statValue: leader.boxscore.reboundsTotal,
                        }))}
                      />
                      <MatchPlayerLeadersCard
                        title="Asistencias"
                        data={assistsLeaders.map((leader, index) => ({
                          position: index + 1,
                          player: {
                            id: leader.player.providerId,
                            avatarUrl: leader.player.avatarUrl,
                            name: leader.player.name,
                            team: {
                              code: leader.player.team?.code ?? '',
                              name: leader.player.team?.name ?? '',
                            },
                          },
                          statValue: leader.boxscore.assists,
                        }))}
                      />
                      <MatchPlayerLeadersCard
                        title="Robos"
                        data={stealsLeaders.map((leader, index) => ({
                          position: index + 1,
                          player: {
                            id: leader.player.providerId,
                            avatarUrl: leader.player.avatarUrl,
                            name: leader.player.name,
                            team: {
                              code: leader.player.team?.code ?? '',
                              name: leader.player.team?.name ?? '',
                            },
                          },
                          statValue: leader.boxscore.steals,
                        }))}
                      />
                      <MatchPlayerLeadersCard
                        title="Tapones"
                        data={blocksLeaders.map((leader, index) => ({
                          position: index + 1,
                          player: {
                            id: leader.player.providerId,
                            avatarUrl: leader.player.avatarUrl,
                            name: leader.player.name,
                            team: {
                              code: leader.player.team?.code ?? '',
                              name: leader.player.team?.name ?? '',
                            },
                          },
                          statValue: leader.boxscore.blocks,
                        }))}
                      />
                      <MatchPlayerLeadersCard
                        title="3PTM"
                        data={threePointersMadeLeaders.map((leader, index) => ({
                          position: index + 1,
                          player: {
                            id: leader.player.providerId,
                            avatarUrl: leader.player.avatarUrl,
                            name: leader.player.name,
                            team: {
                              code: leader.player.team?.code ?? '',
                              name: leader.player.team?.name ?? '',
                            },
                          },
                          statValue: leader.boxscore.threePointersMade,
                        }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="mb-5">
                    <MatchInfoCard
                      startAt={match.startAt}
                      venue={{ name: match.venue?.name ?? '' }}
                      channel={match.channel ?? DEFAULT_MEDIA_PROVIDER}
                      ticketUrl={match.homeTeam.ticketUrl}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-center">
                      <img
                        src="https://dummyimage.com/300x250/ccc/fff"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container">
              <MatchBoxScoreWidget match={match} />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
