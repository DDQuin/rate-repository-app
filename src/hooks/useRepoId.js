import { } from 'react';
import { useQuery } from '@apollo/client';

import { REPO_BY_ID } from '../graphql/queries';


const useRepoId= (id, first) => {
    const { data, loading, fetchMore, ...result } = useQuery(REPO_BY_ID, {
      variables: {
        "id": id,
      },
      fetchPolicy: 'cache-and-network',
      });


      const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
            "id": id,
            first: first,
          },
        });
      };


      return {
        repository: data?.repository,
        fetchMore: handleFetchMore,
        loading,
        ...result,
      };
};

export default useRepoId;