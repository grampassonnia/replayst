import { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GameList from '../../components/GameList';
import { UserContext } from '../../components/UserContext';

export default function CollectionScreen() {
  const { toRender } = useContext(UserContext);
  const [tiles] = toRender;
  return (
    <View style={styles.container}>
      {!tiles ? (
        <Text style={styles.testDesc}>Loading...</Text>
      ) : (
        <GameList style={styles.list} tiles={tiles} isFromCollection={true} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#110d07'
  },
  list: {
    marginTop: 50
  }
});
