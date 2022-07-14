import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import Text from "./Text"
import { FlatList, View } from "react-native"
import { StyleSheet } from "react-native"
import theme from "../theme"
import useRepoId from "../hooks/useRepoId"

const RespoitoryView = () => {
    const id = useParams().id
    const { repository, fetchMore } = useRepoId(id, 8);
    const onEndReach = () => {
      console.log("end")
      fetchMore()
    };

    if (repository) {
        const reviewNodes = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];
        return (
                    <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} showUrl={true}/>}
            onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
            />  
            )
    }
    return (
        <Text>Id not found</Text>
    )

}

const ReviewItem = ({review}) => {

    const styles = StyleSheet.create({
        background: {
            backgroundColor: 'white',
            padding: 10,
            marginTop: 10,
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
        desc: {
            marginTop: 10,
        },
        circle: {
            width: 40,
            height: 40,
            borderWidth: 2,
            borderRadius: 20,
            justifyContent: 'center',
            marginRight: 4,
            borderColor: theme.colors.primary,
        },
        rating: {
            textAlign: 'center',
            color: theme.colors.primary,
        }
      });

      //const date = format(Date.parse(review.createdAt), 'dd.mm.yyyy')
      const dateReals = Date.parse(review.createdAt)
      const dateReal = new Date(dateReals)
      const day = dateReal.getDay()
      const month = dateReal.getMonth() + 1
      const year = dateReal.getYear()
      const date = `${day}.${month}.${year}`
    return (
        <View style={[styles.background, styles.flexContainer]} >
            <View style={styles.topBar}>
                <View style={styles.circle} >
                <Text fontWeight="bold" style={styles.rating}>{review.rating}    </Text>
                </View>
                <View style={styles.topBar2}>
                    <Text fontWeight="bold">{review.user.username}</Text>
                    <Text color="extra">{date}</Text>
                    <Text style={styles.desc} >{review.text}</Text>
                 </View>
            </View>
        </View>
    )

}

export default RespoitoryView