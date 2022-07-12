import { View, StyleSheet, Pressable} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundBar,
    paddingBottom: 20
  },
  
});

const AppBar = () => {
  return <View style={styles.container} opacity={0.9}>
    <AppBarTab text="Repositories"/>
  </View>
};

const AppBarTab = ({text}) => {
    return (
      <Pressable>
      <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
          {text}
        </Text>
      </Pressable>
    )
  };

export default AppBar;