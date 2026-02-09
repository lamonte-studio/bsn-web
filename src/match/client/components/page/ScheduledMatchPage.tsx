'use client';

import { DEFAULT_MEDIA_PROVIDER } from '@/constants';
import CompletedMatchCardBasic from '@/match/components/card/CompletedMatchCardBasic';
import MatchInfoCard from '@/match/components/MatchInfoCard';
import ScheduledMatchScoreBoard from '@/match/components/scoreboard/ScheduledMatchScoreBoard';
import MatchTeamStatsComparison from '@/match/components/stats/MatchTeamStatsComparison';
import { MatchType } from '@/match/types';
import MatchFeaturedPlayers from '../MatchFeaturedPlayers';
import { useMemo } from 'react';
import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';

type LeadersCategoryStatsType = {
  player: {
    providerId: string;
    avatarUrl: string;
    name: string;
  };
  value: number;
};

type Props = {
  match: MatchType;
  homeTeamBoxScore: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
  };
  visitorTeamBoxScore: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
  };
  headToHeadMatches: MatchType[];
  homeTeamPointsLeaders: LeadersCategoryStatsType[];
  homeTeamAssistsLeaders: LeadersCategoryStatsType[];
  homeTeamReboundsLeaders: LeadersCategoryStatsType[];
  visitorTeamPointsLeaders: LeadersCategoryStatsType[];
  visitorTeamAssistsLeaders: LeadersCategoryStatsType[];
  visitorTeamReboundsLeaders: LeadersCategoryStatsType[];
};

export default function ScheduledMatchPage({
  match,
  homeTeamBoxScore,
  visitorTeamBoxScore,
  headToHeadMatches,
  homeTeamPointsLeaders,
  homeTeamAssistsLeaders,
  homeTeamReboundsLeaders,
  visitorTeamPointsLeaders,
  visitorTeamAssistsLeaders,
  visitorTeamReboundsLeaders,
}: Props) {
  const homeTeamWon = useMemo(() => {
    let won = 0;
    headToHeadMatches.forEach((item) => {
      if (
        item.homeTeam.code === match.homeTeam.code &&
        parseInt(item.homeTeam.score, 10) > parseInt(item.visitorTeam.score, 10)
      ) {
        won += 1;
      } else if (
        item.visitorTeam.code === match.homeTeam.code &&
        parseInt(item.visitorTeam.score, 10) > parseInt(item.homeTeam.score, 10)
      ) {
        won += 1;
      }
    });
    return won;
  }, [headToHeadMatches, match.homeTeam.code]);

  const visitorTeamWon = useMemo(() => {
    let won = 0;
    headToHeadMatches.forEach((item) => {
      if (
        item.homeTeam.code === match.visitorTeam.code &&
        parseInt(item.homeTeam.score, 10) > parseInt(item.visitorTeam.score, 10)
      ) {
        won += 1;
      } else if (
        item.visitorTeam.code === match.visitorTeam.code &&
        parseInt(item.visitorTeam.score, 10) > parseInt(item.homeTeam.score, 10)
      ) {
        won += 1;
      }
    });
    return won;
  }, [headToHeadMatches, match.visitorTeam.code]);

  return (
    <>
      <section className="bg-[#0F171F] mb-6 md:mb-10 lg:mb-15">
        <div className="container">
          <div className="mx-auto py-[32px] md:py-[42px] xl:py-[52px] lg:w-9/12 xl:w-8/12">
            <ScheduledMatchScoreBoard
              startAt={match.startAt}
              homeTeam={{
                code: match.homeTeam.code,
                nickname: match.homeTeam.nickname,
                color: match.homeTeam.color,
                city: match.homeTeam.city,
                competitionStandings: {
                  won: match.homeTeam.competitionStandings?.won ?? 0,
                  lost: match.homeTeam.competitionStandings?.lost ?? 0,
                },
              }}
              visitorTeam={{
                code: match.visitorTeam.code,
                nickname: match.visitorTeam.nickname,
                color: match.visitorTeam.color,
                city: match.visitorTeam.city,
                competitionStandings: {
                  won: match.visitorTeam.competitionStandings?.won ?? 0,
                  lost: match.visitorTeam.competitionStandings?.lost ?? 0,
                },
              }}
              venue={{ name: match.venue?.name ?? '' }}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 lg:pr-16">
              <div className="mb-6 md:mb-10 lg:mb-15">
                <MatchFeaturedPlayers
                  homeTeam={{ code: match.homeTeam.code }}
                  visitorTeam={{ code: match.visitorTeam.code }}
                  homeTeamPointsLeaders={homeTeamPointsLeaders}
                  homeTeamAssistsLeaders={homeTeamAssistsLeaders}
                  homeTeamReboundsLeaders={homeTeamReboundsLeaders}
                  visitorTeamPointsLeaders={visitorTeamPointsLeaders}
                  visitorTeamAssistsLeaders={visitorTeamAssistsLeaders}
                  visitorTeamReboundsLeaders={visitorTeamReboundsLeaders}
                />
              </div>
              <div className="mb-6 md:mb-10 lg:mb-15">
                <div className="flex flex-row justify-between items-center mb-[30px]">
                  <div>
                    <h3 className="text-[22px] text-black md:text-[24px]">
                      Últimos encuentros
                    </h3>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <TeamLogoAvatar teamCode={match.homeTeam.code} size={24} />
                    <span className="text-[23px]">
                      {homeTeamWon}
                    </span>
                    <span className="text-[23px] text-[rgba(124,124,124,0.8)]">-</span>
                    <span className="text-[23px]">
                      {visitorTeamWon}
                    </span>
                    <TeamLogoAvatar teamCode={match.visitorTeam.code} size={24} />
                  </div>
                </div>
                <div
                  className="flex flex-row flex-nowrap gap-3 overflow-x-auto"
                  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                  {headToHeadMatches.map((item) => (
                    <div
                      key={`head-to-head-${item.providerId}`}
                      className="max-w-[150px]"
                    >
                      <CompletedMatchCardBasic
                        startAt={item.startAt}
                        homeTeam={{
                          code: item.homeTeam.code,
                          score: item.homeTeam.score,
                        }}
                        visitorTeam={{
                          code: item.visitorTeam.code,
                          score: item.visitorTeam.score,
                        }}
                        overtimePeriods={item.overtimePeriods}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mb-6 md:mb-10 lg:mb-15">
                <img src="https://dummyimage.com/728x90/ccc/fff" alt="" />
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
              <div className="mb-6 md:mb-10 lg:mb-15">
                <MatchTeamStatsComparison
                  homeTeam={{ code: match.homeTeam.code }}
                  visitorTeam={{ code: match.visitorTeam.code }}
                  homeTeamBoxScore={{
                    points: homeTeamBoxScore.points,
                    rebounds: homeTeamBoxScore.rebounds,
                    assists: homeTeamBoxScore.assists,
                    steals: homeTeamBoxScore.steals,
                    blocks: homeTeamBoxScore.blocks,
                    turnovers: homeTeamBoxScore.turnovers,
                  }}
                  visitorTeamBoxScore={{
                    points: visitorTeamBoxScore.points,
                    rebounds: visitorTeamBoxScore.rebounds,
                    assists: visitorTeamBoxScore.assists,
                    steals: visitorTeamBoxScore.steals,
                    blocks: visitorTeamBoxScore.blocks,
                    turnovers: visitorTeamBoxScore.turnovers,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
