import { SafeAreaView, StyleSheet,ScrollView} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from "./Text"
import { Link } from "react-router-native";

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

const AppBar = () => {
  return( 
  <SafeAreaView style={styles.container} opacity={0.9}>
    <ScrollView horizontal style={styles.hori} contentContainerStyle={styles.contentContainer}>
    <AppBarTab text="Repositories " url={"/"}/> 
    <AppBarTab text="Sign in " url={"/signIn"}/>
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

export default AppBar;