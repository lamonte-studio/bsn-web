import BoxLayout from "@/shared/components/layout/box/Layout";
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
