import moment from 'moment';
import Link from 'next/link';

type LatestNewsItemProps = {
  slug: string;
  title: string;
  publishedAt: string;
  thumbnailUrl?: string;
};

export default function LatestNewsItem({
  slug,
  title,
  publishedAt,
  thumbnailUrl = '',
}: LatestNewsItemProps) {
  return (
    <div className="flex flex-row gap-4 items-center justify-start">
      <figure>
        <Link href={`/noticias/${slug}`}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="aspect-4/3 rounded-lg w-[124px] border border-[rgba(125,125,125,0.4)] object-cover"
          />
        </Link>
      </figure>
      <div className="flex flex-col gap-2 flex-1">
        <Link href={`/noticias/${slug}`} className="flex-1">
          <h4 className="font-barlow font-medium text-sm">{title}</h4>
        </Link>
        <p
          className="font-barlow text-xs"
          title={moment(publishedAt).format('LL')}
        >
          {moment(publishedAt).format('D')} de{' '}
          {moment(publishedAt).format('MMMM')}
        </p>
      </div>
    </div>
  );
}
