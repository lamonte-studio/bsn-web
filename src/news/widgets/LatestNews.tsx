import Link from 'next/link';
import LatestNewsItem from '../components/latest-news/LatestNewsItem';

export default function LatestNews() {
  return (
    <div className="border border-gray-200 flex-1 rounded-lg shadow-sm bg-white">
      <div className="border-b border-gray-200 p-4 flex flex-row justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold">Lo más reciente</h3>
        </div>
        <div>
          <Link href="/noticias" className="text-blue-500 hover:underline">Ver más noticias</Link>
        </div>
      </div>
      <div>
        <LatestNewsItem
          slug="vaqueros-otra-victoria"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/80x80/ccc/fff"
        />
        <LatestNewsItem
          slug="vaqueros-otra-victoria"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/80x80/ccc/fff"
        />
        <LatestNewsItem
          slug="vaqueros-otra-victoria"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/80x80/ccc/fff"
        />
        <LatestNewsItem
          slug="vaqueros-otra-victoria"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/80x80/ccc/fff"
        />
        <LatestNewsItem
          slug="vaqueros-otra-victoria"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/80x80/ccc/fff"
        />
      </div>
    </div>
  );
}
