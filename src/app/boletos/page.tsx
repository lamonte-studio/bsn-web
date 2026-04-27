import { getClient } from '@/apollo-client';
import { TEAM_DETAIL } from '@/graphql/team';
import FullWidthLayout from '@/shared/components/layout/fullwidth/FullWidthLayout';
import BoletosPageClient, { BoletosTeam } from './BoletosPageClient';
import BoletosHero from './BoletosHero';
import { BOLETOS_TEAMS_META } from './teams';

type TeamDetailResponse = {
  team: {
    code: string;
    name: string;
    ticketUrl?: string | null;
  } | null;
};

async function fetchBoletosTeams(): Promise<BoletosTeam[]> {
  const results = await Promise.all(
    BOLETOS_TEAMS_META.map((meta) =>
      getClient()
        .query<TeamDetailResponse>({
          query: TEAM_DETAIL,
          variables: { code: meta.code },
          fetchPolicy: 'network-only',
        })
        .catch((e) => {
          console.error(`[BoletosPage] error fetching ${meta.code}:`, e);
          return null;
        }),
    ),
  );

  const teams: BoletosTeam[] = BOLETOS_TEAMS_META.map((meta, i) => {
    const team = results[i]?.data?.team;
    return {
      code: meta.code,
      fullName: team?.name || meta.fallbackName,
      venue: meta.venue,
      borderColor: meta.borderColor,
      ticketUrl: team?.ticketUrl || '',
    };
  });

  return teams.sort((a, b) => a.fullName.localeCompare(b.fullName, 'es'));
}

const HEADER_BACKGROUND = [
  'radial-gradient(50% 80% at 50% 0%, rgba(96,176,245,0.10) 0%, rgba(96,176,245,0) 70%)',
  'radial-gradient(60% 90% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
  'linear-gradient(180deg, rgba(17,22,29,0.20) 0%, rgba(10,14,20,0) 100%)',
  '#0F171F',
].join(', ');

export default async function BoletosPage() {
  const teams = await fetchBoletosTeams();

  return (
    <FullWidthLayout
      divider
      headerBackground={HEADER_BACKGROUND}
      subheader={<BoletosHero />}
    >
      <BoletosPageClient teams={teams} />
    </FullWidthLayout>
  );
}
