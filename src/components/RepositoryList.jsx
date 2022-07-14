import { FlatList, View, StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories, setOrderBy, setOrderDirection, selectedPrinciple, setSelectedPrinciple}) => {
  const navigate = useNavigate()
  // Get the nodes from the edges array
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
        <RepositoryItem item={item} showUrl={false}/>
        </Pressable>
      )}
      ListHeaderComponent={<MenuComponent setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} selectedPrinciple={selectedPrinciple} setSelectedPrinciple={setSelectedPrinciple}/>}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("RATING_AVERAGE")
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [selectedPrinciple, setSelectedPrinciple] = useState("highest_repos");
  const { data } = useRepositories(orderBy, orderDirection);
  if (data && data.repositories) {
  return <RepositoryListContainer repositories={data.repositories} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} selectedPrinciple={selectedPrinciple} setSelectedPrinciple={setSelectedPrinciple} />;
  }
  return (
    <View>
      
    </View>
  )
};

const MenuComponent = ({setOrderBy, setOrderDirection, selectedPrinciple, setSelectedPrinciple}) => {
  return (
    <View style={{zIndex: 100}}>
    <Picker
    selectedValue={selectedPrinciple}
    onValueChange={(itemValue, itemIndex) => {
      setSelectedPrinciple(itemValue)
      if (itemValue === "latest_repos") {
        setOrderBy("CREATED_AT")
        setOrderDirection("ASC")
      } else if (itemValue === "highest_repos") {
        setOrderBy("RATING_AVERAGE")
        setOrderDirection("DESC")
      } else if (itemValue === "lowest_repos") {
        setOrderBy("RATING_AVERAGE")
        setOrderDirection("ASC")
      }
    }
    }
    >
    <Picker.Item label="Latest repositories" value="latest_repos" />
    <Picker.Item label="Highest rated repositories" value="highest_repos" />
    <Picker.Item label="Lowest rated repositories" value="lowest_repos" />

    </Picker>
    </View>
  );
}

export default RepositoryList;