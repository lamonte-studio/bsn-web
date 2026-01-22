import Link from 'next/link';
import LatestNewsItem from '../components/latest-news/LatestNewsItem';
import { NewsType } from '../types';
import { getClient } from '@/apollo-client';
import { LATEST_NEWS } from '@/graphql/news';

const NEWS_PER_PAGE = 5;

const fetchLatestNews = async (): Promise<NewsType[]> => {
  const { data, error } = await getClient().query({
    query: LATEST_NEWS,
    variables: { first: NEWS_PER_PAGE },
  });

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data.news.edges.map((edge: { node: NewsType }) => edge.node);
};

export default async function LatestNewsWidget() {
  const data: NewsType[] = await fetchLatestNews();
  return (
    <div className="border border-gray-200 flex-1 rounded-lg shadow-sm bg-white">
      <div className="border-b border-gray-200 p-4 flex flex-row justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold font-special-gothic-condensed-one text-2xl">
            Noticias recientes
          </h3>
        </div>
        <div>
          <Link
            href="/noticias"
            className="text-gray-500 text-sm hover:text-blue-500 hover:underline"
          >
            Ver más noticias
          </Link>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {data.map((item) => (
          <LatestNewsItem
            key={`latest-news-${item.id}`}
            slug="noticia-ejemplo"
            title={item.title}
            publishedAt={item.publishedAt}
            thumbnailUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
