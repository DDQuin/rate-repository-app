import { useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    
    const [mutate, result] = useMutation(SIGN_IN);
  
    const signIn = async ({ username, password }) => {
        const vars = {
            username,
            password,
          };
      // call the mutate function here with the right arguments
      const result = await mutate({ variables: vars });
      const token = result.data.authenticate.accessToken
      await authStorage.setAccessToken(token)
      apolloClient.resetStore();
      return result
    };
  
    return [signIn, result];
  };

  export default useSignIn;