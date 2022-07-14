import { useNavigate, useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import Text from "./Text"
import { FlatList, View } from "react-native"
import { StyleSheet } from "react-native"
import theme from "../theme"
import useRepoId from "../hooks/useRepoId"
import { Pressable } from "react-native"
import { Alert } from "react-native"
import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"

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
            renderItem={({ item }) => <ReviewItem review={item} showActions={false} />}
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

export const ReviewItem = ({review, showActions, fetchAgain}) => {
    const navigate = useNavigate()

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
        },
        buttonBar: {
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        urlButton: {
            marginTop: 10,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            borderRadius: 5,
            padding: 10,
            paddingHorizontal: 30,
        },
        deleteButton: {
            marginTop: 10,
            backgroundColor: theme.colors.error,
            alignItems: "center",
            borderRadius: 5,
            padding: 10,
            paddingHorizontal: 30,
        },
      });

      //const date = format(Date.parse(review.createdAt), 'dd.mm.yyyy')
      const dateReals = Date.parse(review.createdAt)
      const dateReal = new Date(dateReals)
      const day = dateReal.getDay()
      const month = dateReal.getMonth() + 1
      const year = dateReal.getYear()
      const date = `${day}.${month}.${year}`
      const [mutate, result] = useMutation(DELETE_REVIEW);

      const deleteReview = () => {
        Alert.alert(
            "Deleting",
            "Are you sure you want to delete this review?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Delete", onPress: async () => {
                const result = await mutate({ variables: {deleteReviewId: review.id}});
                if (showActions) {
                fetchAgain()
                }
              } }
            ]
          );
      }
    return (
        <View style={[styles.background, styles.flexContainer]} >
            <View style={styles.topBar}>
                <View style={styles.circle} >          
                <Text fontWeight="bold" style={styles.rating}>{review.rating}    </Text>
                </View>
                <View style={styles.topBar2}>
                    {showActions ? <Text fontWeight="bold">{review.repositoryId}</Text>: <Text fontWeight="bold">{review.user.username}</Text>}
                    <Text color="extra">{date}</Text>
                    <Text style={styles.desc} >{review.text}</Text>
                 </View>
            </View>
            {showActions && 
            <View style={styles.buttonBar}>
                <Pressable onPress={() =>  navigate(`/repositories/${review.repositoryId}`)}>
            <View style={styles.urlButton}>
                    <Text color="textSecondary" fontWeight="bold" >View repo</Text>
            </View>
            </Pressable>
            <Pressable onPress={deleteReview}>
            <View style={styles.deleteButton}>
                    <Text color="textSecondary" fontWeight="bold" >Delete review</Text>
            </View>
            </Pressable>
            </View>
            }
        </View>
    )

}

export default RespoitoryView