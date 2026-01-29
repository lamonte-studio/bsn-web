import CompletedMatchScoreBoard from "@/match/components/scoreboard/CompletedMatchScoreBoard";
import MatchQuarterScoreBoard from "@/match/components/scoreboard/MatchQuarterScoreBoard";
import BoxLayout from "@/shared/components/layout/box/BoxLayout";

export default function PartidoPage() {
  return (
    <BoxLayout>
      <section>
        <CompletedMatchScoreBoard
          startAt="2024-06-15T19:00:00Z"
          homeTeam={{ code: "SCE", score: "102", color: "#552583" }}
          visitorTeam={{ code: "CAG", score: "99", color: "#007A33" }}
          venue={{ name: "Staples Center" }}
          overtimePeriods={1}
        />
      </section>
      <section>
        <MatchQuarterScoreBoard
          homeTeam={{
            code: "SCE",
            nickname: "Cangrejeros",
            competitionStandings: { won: 45, lost: 20 },
          }}
          visitorTeam={{
            code: "CAG",
            nickname: "Criollos",
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
    </BoxLayout>
  );
}
