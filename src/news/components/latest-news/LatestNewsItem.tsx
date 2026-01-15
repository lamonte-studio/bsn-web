type LatestNewsItemProps = {
  title: string;
  thumbnail: string;
  url: string;
};

export default function LatestNewsItem({
  title,
  thumbnail,
  url,
}: LatestNewsItemProps) {
  return (
    <a href={url}>
      <h4>{title}</h4>
      <img src={thumbnail} alt={title} />
    </a>
  );
}
