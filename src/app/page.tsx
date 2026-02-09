import FullWidthLayout from '@/shared/components/layout/fullwidth/FullWidthLayout';
import APGPlayerLeadersCard from '@/stats/widgets/season/player/APGPlayerLeadersCard';
import BPGPlayerLeadersCard from '@/stats/widgets/season/player/BPGPlayerLeadersCard';
import PPGPlayerLeadersCard from '@/stats/widgets/season/player/PPGPlayerLeadersCard';
import RPGPlayerLeadersCard from '@/stats/widgets/season/player/RPGPlayerLeadersCard';
import ThreePTPlayerLeadersCard from '@/stats/widgets/season/player/ThreePTPlayerLeadersCard';
import TOVPlayerLeadersCard from '@/stats/widgets/season/player/TOVPlayerLeadersCard';
import LatestNewsWidget from '@/news/widgets/LatestNewsWidget';
import TheRouteWidget from '@/highlights/widgets/TheRouteWidget';
import TopPerformancesWidget from '@/highlights/widgets/TopPerformancesWidget';
import DailyMatchesSliderWidget from '@/match/client/containers/DailyMatchesSliderWidget';
import SeasonStandingsTableBasicGroupsWidget from '@/stats/widgets/standings/table/SeasonStandingsTableBasicGroupsWidget';
import TopNewsWidget from '@/news/widgets/TopNewsWidget';
import Link from 'next/link';

export default function Home() {
  return (
    <FullWidthLayout>
      <section className="bg-[#0F171F] pb-[116px] lg:pb-[108px]">
        <div className="container">
          <DailyMatchesSliderWidget />
        </div>
      </section>
      <section className="container mb-8 -mt-[94px] lg:mb-16 lg:-mt-[76px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div>
              <TopNewsWidget />
            </div>
            <div className="mb-8">
              <div>
                <h2>Mejores jugadas</h2>
              </div>
              <div>
                <TopPerformancesWidget />
              </div>
            </div>
            <div className="mb-16">
              <div>
                <h2>La ruta</h2>
              </div>
              <div>
                <TheRouteWidget />
              </div>
            </div>
            <div>
              <div className="flex justify-center">
                <img src="https://dummyimage.com/728x90/ccc/fff" alt="" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            {/* <div className="mb-4">
              <LatestNewsWidget />
            </div> */}
            <div className="mb-4">
              <SeasonStandingsTableBasicGroupsWidget />
            </div>
            <div className="mb-4">
              <div className="flex justify-center">
                <img src="https://dummyimage.com/300x250/ccc/fff" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mb-8 lg:mb-16">
        <div className="flex flex-row justify-between items-center mb-[20px] md:mb-[32px]">
          <h2 className="text-[22px] text-[rgba(15,23,31,1)] md:text-[32px]">
            Líderes de Temporada 2026
          </h2>
          <div className="hidden md:block">
            <Link
              href="/estadisticas"
              className="bg-[#FCFCFC] border border-[#D9D3D3] inline-block min-w-[216px] p-[12px] rounded-[12px] shadow-[0px_1px_2px_0px_#14181F0D] text-center"
            >
              <span className="text-base text-black">Ver más estadísticas</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PPGPlayerLeadersCard />
            <RPGPlayerLeadersCard />
            <APGPlayerLeadersCard />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BPGPlayerLeadersCard />
            <ThreePTPlayerLeadersCard />
            <TOVPlayerLeadersCard />
          </div>
        </div>
      </section>
    </FullWidthLayout>
  );
}
