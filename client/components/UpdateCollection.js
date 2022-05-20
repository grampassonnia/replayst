import { useState, useContext } from 'react';
import { Pressable } from 'react-native';
import {
  addGameToCollection,
  removeFromCollection
} from '../services/DbClient';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE } from '../services/theme';
import { UserContext } from './UserContext';

export default function UpdateCollection({
  game,
  match,
  setList,
  list,
  addIcon,
  removeIcon
}) {
  const [isAdded, setIsAdded] = useState(match);
  const { rendered, toRender } = useContext(UserContext);
  const [renderedList] = rendered;
  const [gamesToRender, setGamesToRender] = toRender;

  const userId = '6261e0b712592ddafe9b6aa2';
  return (
    <Pressable
      onPress={() =>
        !isAdded
          ? addGameToCollection(userId, game, list).then(res => {
              setIsAdded(!isAdded);
              setList(prev => [
                {
                  _id: res.added._id,
                  background_image: res.added.background_image,
                  id: res.added.id,
                  name: res.added.name
                },
                ...prev
              ]);
            })
          : removeFromCollection(userId, game._id, list).then(res => {
              setIsAdded(prev => !prev);
              setList(prev => prev.filter(game => game._id !== res.id));
              renderedList === list &&
                setGamesToRender(prev =>
                  prev.filter(game => game._id !== res.id)
                );
            })
      }
    >
      {isAdded ? (
        <Ionicons name={removeIcon} size={28} color={PALETTE.one} />
      ) : (
        <Ionicons name={addIcon} size={28} color={PALETTE.four} />
      )}
    </Pressable>
  );
}
