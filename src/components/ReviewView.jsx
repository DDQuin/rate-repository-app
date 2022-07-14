
import Text from "./Text"
import { FlatList, View } from "react-native"

import { useQuery } from "@apollo/client"
import { USER_REVIEWS } from "../graphql/queries"
import { ReviewItem } from "./RepositoryView"

const ReviewView = () => {

    const {data} = useQuery(USER_REVIEWS, {fetchPolicy: 'cache-and-network'})
    console.log(data)

    if (data) {
        const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];
        return (
                    <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            />  
            )
    }
    return (
        <Text>Id not found</Text>
    )

}



export default ReviewView