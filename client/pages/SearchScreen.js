import { StyleSheet, Text, View } from 'react-native';
import GameList from '../components/GameList';
import { fetchMore } from '../services/ApiClient';
import { Fontisto } from '@expo/vector-icons';
import { PALETTE } from '../services/theme';

function SearchScreen({
  searchResults,
  setSearchResults,
  nextSearchUrl,
  setNextSearchUrl,
  listViewRef
}) {
  // INFINITE SCROLL END OF API LIST-AWARE
  function infiniteScroll(url) {
    if (nextSearchUrl) {
      fetchMore(url).then(res => {
        setSearchResults(
          prev => [...prev, ...res.results],
          setNextSearchUrl(res.next)
        );
      });
    }
  }

  return (
    <View style={styles.container}>
      {!searchResults.length ? (
        <Fontisto name="search" size={150} color="#71797E" />
      ) : (
        <GameList
          style={styles.list}
          tiles={searchResults}
          nextUrl={nextSearchUrl}
          infiniteScroll={infiniteScroll}
          listViewRef={listViewRef}
        />
      )}
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PALETTE.six,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    marginTop: 50
  }
});
