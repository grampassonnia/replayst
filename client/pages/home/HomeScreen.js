import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GameList from '../../components/GameList';
import { getPopularGames, fetchMore } from '../../services/ApiClient';

export default function HomeScreen() {
  const [tiles, setTiles] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  useEffect(() => {
    getPopularGames()
      .then(res => {
        setNextUrl(res.next);
        setTiles(res.results);
      })
  }, []);

  function infiniteScroll(url) {
    if (nextUrl) {
      fetchMore(url).then(res =>
        setTiles(prev => [...prev, ...res.results], setNextUrl(res.next))
      );
    }
  }

  return (
    <View style={styles.container}>
      {!tiles ? (
        <Text style={styles.testDesc}>Loading...</Text>
      ) : (
        <GameList
          style={styles.list}
          tiles={tiles}
          infiniteScroll={infiniteScroll}
          nextUrl={nextUrl}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#110d07',
    flex: 1,
    justifyContent: 'center'
  },
  list: {
    marginTop: 50
  }
});
