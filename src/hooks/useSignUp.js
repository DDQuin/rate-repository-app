import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
    
    const [mutate, result] = useMutation(CREATE_USER);
  
    const signUp = async ({ username, password }) => {
        const vars = {
            username,
            password,
          };
      // call the mutate function here with the right arguments
      const result = await mutate({ variables: vars });
      return result
    };
  
    return [signUp, result];
  };

  export default useSignUp;