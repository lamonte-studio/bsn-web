import FullWidthLayout from '@/shared/components/layout/fullwidth/FullWidthLayout';
import APGPlayerLeadersCard from '@/stats/widgets/season/player/APGPlayerLeadersCard';
import BPGPlayerLeadersCard from '@/stats/widgets/season/player/BPGPlayerLeadersCard';
import PPGPlayerLeadersCard from '@/stats/widgets/season/player/PPGPlayerLeadersCard';
import RPGPlayerLeadersCard from '@/stats/widgets/season/player/RPGPlayerLeadersCard';
import LatestNewsWidget from '@/news/widgets/LatestNewsWidget';
import RecentCalendarSliderWidget from '@/match/client/containers/RecentCalendarSliderWidget';
import SeasonStandingsTableBasicGroupsWidget from '@/stats/widgets/standings/table/SeasonStandingsTableBasicGroupsWidget';
import TopNewsWidget from '@/news/widgets/TopNewsWidget';
import Link from 'next/link';
import WSCBlazeSDK from '@/shared/client/components/wsc/WSCBlazeSDK';
import WSCHomeStories from '@/highlights/client/components/WSCHomeStories';
import WSCMoments from '@/highlights/client/components/WSCMoments';
import AdSlot from '@/shared/client/components/gtm/AdSlot';
import SPGPlayerLeadersCard from '@/stats/widgets/season/player/SPGPlayerLeadersCard';
import FGMPlayerLeadersCard from '@/stats/widgets/season/player/FGMPlayerLeadersCard';

export default function Home() {
  return (
    <FullWidthLayout>
      <WSCBlazeSDK apiKey={process.env.NEXT_PUBLIC_WSC_API_KEY || ''} />
      <section className="bg-[#0F171F] pb-[116px] lg:pb-[108px]">
        <div className="container relative">
          <RecentCalendarSliderWidget />
          <div className="absolute bg-[linear-gradient(-90deg,rgba(15,23,31,0.9)_21.8%,rgba(0,0,0,0)_96.31%)] top-0 bottom-0 right-0 w-[48px] md:w-[232px]"></div>
        </div>
      </section>
      <section className="container mb-8 -mt-[94px] lg:mb-16 lg:-mt-[76px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="mb-4 md:mb-8 lg:mb-12">
              <TopNewsWidget />
            </div>
            <div className="mb-4 md:mb-8 lg:mb-14">
              <div className="flex flex-row justify-between items-center mb-4 md:mb-[26px]">
                <div>
                  <h3 className="text-[22px] text-black md:text-[24px]">
                    #LaLigaMásDura
                  </h3>
                </div>
              </div>
              <div>
                <WSCHomeStories />
              </div>
            </div>
            <div className="mb-4 md:mb-8 lg:mb-14">
              <div className="flex flex-row justify-between items-center mb-4 md:mb-[26px]">
                <div>
                  <h3 className="text-[22px] text-black md:text-[24px]">
                    Highlights
                  </h3>
                </div>
              </div>
              <div>
                <WSCMoments />
              </div>
            </div>
            <div>
              <div className="flex justify-center">
                <AdSlot adUnit="/23296921845/728-90" size={[728, 90]} elementId="div-gpt-ad-728-90-1" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="mb-4">
              <LatestNewsWidget />
            </div>
            <div className="mb-4">
              <SeasonStandingsTableBasicGroupsWidget />
            </div>
            <div className="mb-4">
              <div className="flex justify-center">
                <AdSlot adUnit="/23296921845/300-250" size={[300, 250]} elementId="div-gpt-ad-300-250-1" />
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
          <div className="hidden">
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
            <SPGPlayerLeadersCard />
            <FGMPlayerLeadersCard />
          </div>
        </div>
      </section>
    </FullWidthLayout>
  );
}
