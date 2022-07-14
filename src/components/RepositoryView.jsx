import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"
import { REPO_BY_ID } from "../graphql/queries"
import RepositoryItem from "./RepositoryItem"
import Text from "./Text"

const RespoitoryView = () => {
    const id = useParams().id
    const {loading, data} = useQuery(REPO_BY_ID, {variables: { id: id }},)

    if (!loading && data && data.repository) {
        return (
            <RepositoryItem item={data.repository} showUrl={true}/>
            )
    }
    return (
        <Text>Id not found</Text>
    )

}

export default RespoitoryView