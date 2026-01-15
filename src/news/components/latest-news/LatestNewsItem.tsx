import Link from "next/link";

type LatestNewsItemProps = {
  slug: string;
  title: string;
  thumbnail: string;
};

export default function LatestNewsItem({
  slug,
  title,
  thumbnail,
}: LatestNewsItemProps) {
  return (
    <div className="flex flex-row gap-4 items-center p-2">
      <Link href={`/noticias/${slug}`} className="flex-1">
        <h4>{title}</h4>
      </Link>
      <figure className="rounded-md overflow-hidden">
        <Link href={`/noticias/${slug}`}>
          <img src={thumbnail} alt={title} />
        </Link>
      </figure>
    </div>
  );
}
