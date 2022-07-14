import { View, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';


const RepositoryItem = ({item, showUrl}) => {
    const styles = StyleSheet.create({
        background: {
            backgroundColor: 'white',
            padding: 10,
            
        },
        flexContainer: {
            flexDirection: 'column',
            alignContent: 'space-around',
        },
        tinyLogo: {
            width: 50,
            height: 50,
            borderRadius: 5,
            marginRight: 10
        },
        topBar: {
            flexDirection: 'row',
            
        },
        topBar2: {
            flexDirection: 'column',
            
        },
        languageBar: {
            backgroundColor: theme.colors.primary,
            alignSelf: 'flex-start',
            borderRadius: 5,
            padding: 5,
        },
        bottomBar: {
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        bottomItem: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        urlButton: {
            marginTop: 10,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            borderRadius: 5,
            padding: 10,
        },
        
        

      });
    return (
        <View testID="repositoryItem" style={[styles.background, styles.flexContainer] }>
            <View style={styles.topBar}>
                <Image style={styles.tinyLogo} source={{uri: item.ownerAvatarUrl}} />
                <View style={styles.topBar2}>
                    <Text fontWeight="bold">{item.fullName}</Text>
                    <Text color="extra">{item.description}</Text>
                    <View style={styles.languageBar}>
                    <Text color="textSecondary" >{item.language}</Text>
                    </View>
                 </View>
            </View>
            <View style={styles.bottomBar}>
                <View style={styles.bottomItem}>
                <Text> {item.stargazersCount}</Text>
                <Text color="extra"> Stars </Text>
                </View>

                <View style={styles.bottomItem}>
                <Text> {item.forksCount}</Text>
                <Text color="extra"> Forks </Text>
                </View>

                <View style={styles.bottomItem}>
                <Text> {item.reviewCount}</Text>
                <Text color="extra"> Reviews </Text>
                </View>
                
                <View style={styles.bottomItem}>
                <Text> {item.ratingAverage}</Text>
                <Text color="extra"> Rating </Text>
                </View>
                
            </View>

            {showUrl && 
            <Pressable onPress={() => Linking.openURL(item.url)}>
            <View style={styles.urlButton}>
                    <Text color="textSecondary" fontWeight="bold" >Open in GitHub</Text>
            </View>
            </Pressable>
            }
                
        </View>
    )
}

export default RepositoryItem