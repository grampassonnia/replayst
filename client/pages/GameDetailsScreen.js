import { useContext, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ActivityIndicator
} from 'react-native';
import { fetchOne } from '../services/ApiClient';
import { DateTime } from 'luxon';
import UpdateCollection from '../components/UpdateCollection';
import { UserContext } from '../components/UserContext';
import { PALETTE } from '../services/theme';

export default function GameDetailsScreen(props) {
  const [game, setGame] = useState(null);

  const { owned, ownedIds, wishlist, wishIds, favorites, favsIds } =
    useContext(UserContext);

  const [pwnd, setPwned] = owned;
  const [whish, setWish] = wishlist;
  const [favs, setFavs] = favorites;

  const ownedMatch = ownedIds.some(id => id === props.route.params.id);
  const wishMatch = wishIds.some(id => id === props.route.params.id);
  const favMatch = favsIds.some(id => id === props.route.params.id);
  const source = ownedMatch || wishMatch || favMatch ? 'DB' : 'API';

  useEffect(() => {
    fetchOne(props.route.params.id, source).then(res => setGame(res));
  }, []);

  const whitespace = ' ';

  return (
    <View style={styles.container}>
      {!game ? (
        <ActivityIndicator size="large" color={PALETTE.one} />
      ) : (
        <ScrollView>
          <Image source={{ uri: game.background_image }} style={styles.image} />
          <View style={styles.buttons}>
            <UpdateCollection
              match={favMatch}
              game={game}
              list={'favorites'}
              setList={setFavs}
              addIcon={'ios-heart-outline'}
              removeIcon={'ios-heart'}
            />
            <UpdateCollection
              match={wishMatch}
              game={game}
              list={'wishlist'}
              setList={setWish}
              addIcon={'ios-star-outline'}
              removeIcon={'ios-star'}
            />
            <UpdateCollection
              match={ownedMatch}
              game={game}
              list={'owned'}
              setList={setPwned}
              addIcon={'ios-add-circle-outline'}
              removeIcon={'ios-checkmark-circle'}
            />
          </View>
          <View style={styles.bodyText}>
            <Text style={[styles.title, styles.textCol]}>{game.name}</Text>
            <View style={styles.devs}>
              {game.developers.map(dev => (
                <Text style={[styles.textCol, styles.devs]} key={dev.id}>
                  {dev.name}
                </Text>
              ))}
            </View>
            <View style={styles.details}>
              <View>
                <View>
                  <Text style={styles.field}>Genres</Text>
                  {game.genres.map(genre => (
                    <Text style={styles.textCol} key={genre.id}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.field}>
                    Release date:{whitespace}
                    <Text style={[styles.textCol, { fontSize: 12 }]}>
                      {DateTime.fromISO(game.released).toLocaleString()}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.field}>Platforms</Text>
                {game.platforms.map(p => (
                  <Text style={styles.textCol} key={p.id}>
                    {p.name}
                  </Text>
                ))}
              </View>
            </View>

            <Text style={styles.field}>ABOUT:</Text>
            <Text style={[styles.textCol, styles.description]}>
              {game.description}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.five,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    aspectRatio: 1.25
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    position: 'relative',
    bottom: 6
  },
  field: {
    color: PALETTE.four,
    paddingBottom: 4,
    paddingRight: 2,
    paddingVertical: 8,
    fontSize: 15
  },
  list: {
    padding: 2
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  devs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    fontSize: 12,
    flexWrap: 'wrap'
  },
  releaseDate: {
    position: 'relative',
    top: 5,
    fontSize: 12
  },
  description: {
    paddingTop: 10
  },
  textCol: {
    color: PALETTE.one
  },
  bodyText: {
    padding: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
