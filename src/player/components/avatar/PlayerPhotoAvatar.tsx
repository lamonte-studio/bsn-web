type Props = {
  photoUrl: string;
  size?: number;
  rounded?: boolean;
};

export default function PlayerPhotoAvatar({
  photoUrl,
  size = 50,
  rounded = true,
}: Props) {
  return <div>Photo Avatar Component</div>;
}
