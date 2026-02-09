'use client';

import LiveMatchScoreBoard from '@/match/components/scoreboard/LiveMatchScoreBoard';
import { MatchType } from '@/match/types';
import LiveMatchPlayByPlayWidget from '../../containers/LiveMatchPlayByPlayWidget';
import LiveMatchBasicBoxScoreBasicWidget from '../../containers/LiveMatchBoxScoreBasicWidget';

type Props = {
  match: MatchType;
};

export default function LiveMatchPage({ match }: Props) {
  return (
    <>
      <section className="bg-[#0F171F]">
        <div className="container">
          <div className="mx-auto py-[32px] md:py-[42px] xl:py-[52px] lg:w-9/12 xl:w-8/12">
            <LiveMatchScoreBoard
                startAt={match.startAt}
                homeTeam={{
                code: match.homeTeam.code,
                nickname: match.homeTeam.nickname,
                score: match.homeTeam.score,
                color: match.homeTeam.color,
                city: match.homeTeam.city,
                }}
                visitorTeam={{
                code: match.visitorTeam.code,
                nickname: match.visitorTeam.nickname,
                score: match.visitorTeam.score,
                color: match.visitorTeam.color,
                city: match.visitorTeam.city,
                }}
                venue={{ name: match.venue?.name ?? '' }}
                currentPeriod={match.currentPeriod}
                currentTime={match.currentTime}
                overtimePeriods={match.overtimePeriods}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 lg:pr-16">
              <div className="mb-4">
                <LiveMatchPlayByPlayWidget />
              </div>
              <div>
                <LiveMatchBasicBoxScoreBasicWidget />
              </div>
            </div>
            <div className="lg:col-span-4"></div>
          </div>
        </div>
      </section>
    </>
  );
}
