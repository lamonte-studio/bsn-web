type Props = {
  teamCode: string;
  size?: number;
  rounded?: boolean;
};

export default function TeamLogoAvatar({
  teamCode,
  size = 50,
  rounded = true,
}: Props) {
  return <div>Logo Avatar Component</div>;
}
