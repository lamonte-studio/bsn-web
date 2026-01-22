import BoxLayout from '@/shared/components/layout/box/Layout';
import APGPlayerLeadersCard from '@/stats/widgets/season/player/APGPlayerLeadersCard';
import BPGPlayerLeadersCard from '@/stats/widgets/season/player/BPGPlayerLeadersCard';
import PPGPlayerLeadersCard from '@/stats/widgets/season/player/PPGPlayerLeadersCard';
import RPGPlayerLeadersCard from '@/stats/widgets/season/player/RPGPlayerLeadersCard';
import SPGPlayerLeadersCard from '@/stats/widgets/season/player/SPGPlayerLeadersCard';
import ThreeFGMPlayerLeadersCard from '@/stats/widgets/season/player/ThreeFGMPlayerLeadersCard';
import LatestNewsWidget from '@/news/widgets/LatestNewsWidget';
import SeasonStandingsTableBasicGroups from '@/stats/widgets/standings/table/SeasonStandingsTableBasicGroups';
import TheRouteWidget from '@/highlights/widgets/TheRouteWidget';
import TopPerformancesWidget from '@/highlights/widgets/TopPerformancesWidget';
import DailyMatchesSliderWidget from '@/match/client/containers/DailyMatchesSliderWidget';

export default function Home() {
  return (
    <BoxLayout>
      <section>
        <DailyMatchesSliderWidget />
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <div>
              <h2>Banner noticia</h2>
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
          <div className="md:col-span-4">
            <div className="mb-4">
              <LatestNewsWidget />
            </div>
            <div className="mb-4">
              <div className="flex justify-center">
                <img src="https://dummyimage.com/300x250/ccc/fff" alt="" />
              </div>
            </div>
            <div className="mb-4">
              <div>
                <h2>Tabla de posiciones</h2>
              </div>
              <SeasonStandingsTableBasicGroups />
            </div> 
          </div>
        </div>
      </section>
      <section>
        <div>
          <h2>Líderes de Temporada 2026</h2>
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
            <ThreeFGMPlayerLeadersCard />
          </div>
        </div>
      </section>
    </BoxLayout>
  );
}
