import Link from 'next/link';
import LatestNewsItem from '../components/latest-news/LatestNewsItem';

export default function LatestNews() {
  return (
    <div>
      <div>
        <div>
          <h3>Lo más reciente</h3>
        </div>
        <div>
          <Link href="/noticias">Ver más noticias</Link>
        </div>
      </div>
      <div>
        <LatestNewsItem
          url="#"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/600x400/000/fff"
        />
        <LatestNewsItem
          url="#"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/600x400/000/fff"
        />
        <LatestNewsItem
          url="#"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/600x400/000/fff"
        />
        <LatestNewsItem
          url="#"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/600x400/000/fff"
        />
        <LatestNewsItem
          url="#"
          title="Vaqueros suman otra victoria"
          thumbnail="https://dummyimage.com/600x400/000/fff"
        />
      </div>
    </div>
  );
}
