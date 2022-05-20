import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { PALETTE } from '../services/theme';

function GameTile({ game, cols }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {
            id: game.id
          });
        }}
      >
        <View style={styles.tileContainer}>
          <Image source={{ uri: game.background_image }} style={styles.pic} />
          <View style={styles.desc}>
            <Text
              style={[
                styles.title,
                { fontSize: cols === 1 ? 18 : 18 / cols + 6 }
              ]}
            >
              {game.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default memo(GameTile);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  pic: {
    aspectRatio: 2,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10
  },
  title: {
    fontSize: 18,
    paddingVertical: '2.5%',
    color: PALETTE.one,
    fontWeight: '500'
  },
  desc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgb(32, 21, 13)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});
