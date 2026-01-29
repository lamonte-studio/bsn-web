import { NewsType } from '../types';
import { getClient } from '@/apollo-client';
import { LATEST_NEWS } from '@/graphql/news';

const NEWS_PER_PAGE = 1;

type LatestNewsResponse = {
  news: {
    edges: { node: NewsType }[];
  };
};

const fetchTopNews = async (): Promise<NewsType[]> => {
  // const { data, error } = await getClient().query<LatestNewsResponse>({
  //   query: LATEST_NEWS,
  //   variables: { first: NEWS_PER_PAGE },
  // });

  // if (error) {
  //   console.error('Error fetching data:', error);
  //   return [];
  // }

  // return data?.news.edges.map((edge: { node: NewsType }) => edge.node) ?? [];
  return [
    {
      id: '1',
      title:
        'Guaynabo defiende su casa, Capitanes con arrolladora victoria ante los Gigantes',
      imageUrl: 'https://dummyimage.com/600x400/ccc/fff',
      publishedAt: '2024-06-01T12:00:00Z',
    },
  ];
};

export default async function TopNewsWidget() {
  const data: NewsType[] = await fetchTopNews();
  return (
    <div className="relative">
      {data[0]?.imageUrl && (
        <div
          className="border border-[rgba(125,125,125,0.4)] pt-[56.25%] bg-cover bg-center rounded-[12px]"
          style={{ backgroundImage: `url(${data[0].imageUrl})` }}
        />
      )}
      <div className="md:absolute bottom-0 left-0 right-0 px-[5px] py-[15px] md:p-[40px]">
        <h2 className="font-barlow font-bold text-lg md:text-[34px]/9 md:text-white">
          {data[0]?.title}
        </h2>
      </div>
    </div>
  );
}
