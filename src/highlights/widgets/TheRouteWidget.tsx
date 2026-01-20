import { TheRouteType } from '../types';
import graphqlClient from '@/graphql-client';
import { THE_ROUTE } from '@/graphql/highlights';
import TheRouteSlider from '../client/components/TheRouteSlider';


const fetchTheRoute = async (): Promise<TheRouteType[]> => {
  const { data, error } = await graphqlClient.query({
    query: THE_ROUTE,
  });

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data.theRoute.items;
};

export default async function TheRouteWidget() {
  const data = await fetchTheRoute();

  return (
    <div>
      <TheRouteSlider items={data} />
    </div>
  );
};
