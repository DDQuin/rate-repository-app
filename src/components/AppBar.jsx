import { SafeAreaView, StyleSheet,ScrollView, Pressable} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from "./Text"
import { Link } from "react-router-native";
import { USER_SIGNED } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useQuery } from '@apollo/client/react';
import { useApolloClient } from '@apollo/client/react';
import { View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundBar,
    paddingBottom: 20,
  },
  hori: {
    flexDirection: 'row',
  }, 
  contentContainer: {
    margin: 30,
   justifyContent: 'space-between',
    flex: 0,
  },
  
});

const Extra = ({data}) => {
  if (data && data.me) {
    return (
      <>
      <AppBarTab text="Review  " url={"/createReview"}/> 
      <AppBarSignOut/>
      </>
    )
  }
  return (
    <>
    <AppBarTab text="Sign in " url={"/signIn"}/>
    <AppBarTab text="Sign up " url={"/signUp"}/>
    </>
  )
}

const AppBar = () => {
  
  
  const { data, loading } = useQuery(USER_SIGNED)
  return( 
  <SafeAreaView style={styles.container} opacity={0.9}>
    <ScrollView horizontal style={styles.hori} contentContainerStyle={styles.contentContainer}>
    <AppBarTab text="Repositories " url={"/"}/>
    <Extra data={data}/>
    </ScrollView>
        
  </SafeAreaView>
  )
};

const AppBarTab = ({text, url}) => {
  
    return (
        <Link to={`${url}`}>
        <Text fontWeight="bold" fontSize="subheading" color="textSecondary" >
          {text}
        </Text>
      </Link>
      
    )
  };

  const AppBarSignOut = () => {
    const authStorage = useAuthStorage();
    const client = useApolloClient()
      const onLogout = async () => {
      await authStorage.removeAccessToken()
      client.resetStore()
    }
    return (
      <Pressable onPress={onLogout}>
        <Text fontWeight="bold" fontSize="subheading" color="textSecondary" >
          Sign out
        </Text>
      </Pressable>
    )
  };

export default AppBar;