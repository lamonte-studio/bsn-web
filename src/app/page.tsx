import LatestNews from "@/news/widgets/LatestNews";
import BoxLayout from "@/shared/components/layout/box/Layout";
import SeasonStandingsTableBasicCard from "@/stats/client/widgets/season/standings/SeasonStandingsTableBasicCard";
import APGPlayerLeadersCard from "@/stats/widgets/season/player/APGPlayerLeadersCard";
import BPGPlayerLeadersCard from "@/stats/widgets/season/player/BPGPlayerLeadersCard";
import PPGPlayerLeadersCard from "@/stats/widgets/season/player/PPGPlayerLeadersCard";
import RPGPlayerLeadersCard from "@/stats/widgets/season/player/RPGPlayerLeadersCard";
import SPGPlayerLeadersCard from "@/stats/widgets/season/player/SPGPlayerLeadersCard";
import ThreeFGMPlayerLeadersCard from "@/stats/widgets/season/player/ThreeFGMPlayerLeadersCard";

export default function Home() {
  return (
    <BoxLayout>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <h2>Banner noticia</h2>
          </div>
          <div className="md:col-span-4">
            <div className="mb-4">
              <LatestNews />
            </div>
            <div className="mb-4">
              <div className="flex justify-center">
                <img src="https://dummyimage.com/300x250/ccc/fff" alt="" />
              </div>
            </div>
            <div className="mb-4">
              <SeasonStandingsTableBasicCard />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h2>Líderes de Temporada 2026</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between gap-4">
            <PPGPlayerLeadersCard />
            <RPGPlayerLeadersCard />
            <APGPlayerLeadersCard />
          </div>
          <div className="flex flex-row justify-between gap-4">
            <BPGPlayerLeadersCard />
            <SPGPlayerLeadersCard />
            <ThreeFGMPlayerLeadersCard />
          </div>
        </div>        
      </section>
    </BoxLayout>
  );
}
