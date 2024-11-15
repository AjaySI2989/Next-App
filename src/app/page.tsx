import './page.module.scss';
import { getQueryClient } from './get-query-client';
import { fetchStandingsData } from '../utils/apiService';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { StandingsContainer } from 'src/components/standings-container';

const Home = async () => {
  
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['standings', 5612], 
    queryFn: () => fetchStandingsData(5612),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StandingsContainer  />
      </HydrationBoundary>
    </div>
  );
}

export default Home;