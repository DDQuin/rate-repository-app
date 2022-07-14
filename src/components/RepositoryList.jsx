import { FlatList, View, StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories, setOrderBy, setOrderDirection, selectedPrinciple, setSelectedPrinciple, search, setSearch, onEndReach,}) => {
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
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<MenuComponent setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} 
      selectedPrinciple={selectedPrinciple} setSelectedPrinciple={setSelectedPrinciple} search={search} setSearch={setSearch}/>}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("RATING_AVERAGE")
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [search, setSearch] = useState("")
  const [value] = useDebounce(search, 500);
  const [selectedPrinciple, setSelectedPrinciple] = useState("highest_repos");
  const { repositories, fetchMore } = useRepositories(orderBy, orderDirection, value, 8);
  const onEndReach = () => {
    console.log("end")
    fetchMore()
  };

  if (repositories) {
  return <RepositoryListContainer repositories={repositories} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} selectedPrinciple={selectedPrinciple} 
  setSelectedPrinciple={setSelectedPrinciple} search={search} setSearch={setSearch} onEndReach={onEndReach}/>;
  }
  return (
    <View>
      
    </View>
  )
};

const MenuComponent = ({setOrderBy, setOrderDirection, selectedPrinciple, setSelectedPrinciple, search, setSearch}) => {
  return (
    <View style={{zIndex: 100}}>
      <Searchbar
      placeholder="Search"
      onChangeText={(q) => setSearch(q) }
      value={search}
    />
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