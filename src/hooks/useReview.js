import { useMutation } from '@apollo/client';

import { REVIEW_REPO } from '../graphql/mutations';


const useReview = () => {
    
    const [mutate, result] = useMutation(REVIEW_REPO);
  
    const createReview = async ({ repositoryName, ownerName, rating, text}) => {
        const vars = {
            repositoryName: repositoryName,
            ownerName: ownerName,
            rating: Number(rating),
            text: text
          };
      // call the mutate function here with the right arguments
      const result = await mutate({ variables: vars });
      return result
    };
  
    return [createReview, result];
  };

  export default useReview;