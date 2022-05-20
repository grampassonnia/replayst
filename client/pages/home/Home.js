import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import GameDetailsScreen from '../GameDetailsScreen';
import SearchScreen from '../SearchScreen';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchGameBar from '../../components/SearchGameBar';
import { useRef, useState } from 'react';
import { searchGamesFromAPI } from '../../services/ApiClient';

const HomeStack = createNativeStackNavigator();

function Home() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nextSearchUrl, setNextSearchUrl] = useState('');
  let listViewRef = useRef();

  function handleOnSubmit() {
    searchGamesFromAPI(search).then((res) => {
      if (searchResults.length)
        listViewRef.current.scrollToOffset({ offset: 0, animated: true });
      setTimeout(() => {
        setNextSearchUrl(res.next);
        setSearchResults(res.results);
        setSearch('');
      }, 100);
    });
  }

  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Explore"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTintColor: '#dedbd6',
            headerStyle: { backgroundColor: '#20150d' },
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('SearchScreen')}>
                <Ionicons name="search" size={20} color="#dedbd6" />
              </Pressable>
            )
          })}
        />
        <HomeStack.Screen
          name="Details"
          component={GameDetailsScreen}
          options={{
            headerBackTitle: '',
            headerTintColor: '#dedbd6',
            headerStyle: { backgroundColor: '#20150d' }
          }}
        />
        <HomeStack.Screen
          name="SearchScreen"
          children={() => (
            <SearchScreen
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              nextSearchUrl={nextSearchUrl}
              setNextSearchUrl={setNextSearchUrl}
              listViewRef={listViewRef}
            />
          )}
          options={{
            headerBackTitle: '',
            headerTintColor: '#c8c6bf',
            headerStyle: { backgroundColor: '#20150d' },
            headerTitle: () => (
              <SearchGameBar
                search={search}
                setSearch={setSearch}
                setSearchResults={setSearchResults}
                handleOnSubmit={handleOnSubmit}
              />
            )
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

module.exports = Home;
