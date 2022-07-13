import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <RepositoryItem item={item}/>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data } = useRepositories();
  if (data && data.repositories) {
  return <RepositoryListContainer repositories={data.repositories} />;
  }
  return (
    <View>
      
    </View>
  )
};

export default RepositoryList;