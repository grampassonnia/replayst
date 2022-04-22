import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import GameTile from './GameTile';

export default function GameList({
  tiles,
  infiniteScroll,
  nextUrl,
  navigation,
  ownedIds
}) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tiles}
        initialNumToRender={8}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <GameTile game={item} navigation={navigation} ownedIds={ownedIds} />
        )}
        maxToRenderPerBatch={4}
        onEndReached={() => {
          console.log('fired');
          // return infiniteScroll(nextUrl) //UNCOMMENT TO ACTIVATE INFINITE SCROLL
        }} // <-- when we call a function directly in JSX we need to put it in a callback function!!!
        onEndReachedThreshold={0.1} // TODO check how many times it gets fired with the active infinite scroll
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
