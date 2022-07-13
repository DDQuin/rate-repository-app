import { useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
  
    const signIn = async ({ username, password }) => {
        const vars = {
            username,
            password,
          };
      // call the mutate function here with the right arguments
      return await mutate({ variables: vars });
    };
  
    return [signIn, result];
  };

  export default useSignIn;