import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';
import cx from 'classnames';

type Props = {
  code: string;
  name: string;
  city: string;
  ranking?: string;
  disabled?: boolean;
  avatarSize?: number;
  avatarSpaceHorizontal?: number;
};

export default function MatchCompetitor({
  code,
  name,
  city,
  ranking,
  disabled = false,
  avatarSize = 42,
  avatarSpaceHorizontal = 6,
}: Props) {
  return (
    <div
      className="flex flex-row items-center justify-center"
      style={{ gap: `${avatarSpaceHorizontal}px` }}
    >
      <TeamLogoAvatar teamCode={code} size={avatarSize} />
      <div className="flex-1">
        <p
          className="font-special-gothic-condensed-one text-lg"
          style={{
            color: disabled ? 'rgba(255, 255, 255, 0.5)' : '#fff',
          }}
        >
          {name}{' '}
          {ranking && (
            <span className="font-barlow text-xs text-[rgba(255,255,255,0.6)]">
              {' '}
              {ranking}
            </span>
          )}
        </p>
        <p className="font-barlow text-xs text-[rgba(255,255,255,0.6)]">
          {city}
        </p>
      </div>
    </div>
  );
}
