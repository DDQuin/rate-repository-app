import { } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (orderBy, orderDirection, searchKeyword) => {
    const { data, loading } = useQuery(GET_REPOSITORIES, {
      variables: {
        "orderDirection": orderDirection,
        "orderBy": orderBy,
        "searchKeyword": searchKeyword,
      },
            fetchPolicy: 'cache-and-network',
          });


  return { data, loading };
};

export default useRepositories;