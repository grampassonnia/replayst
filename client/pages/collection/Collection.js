import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameDetailsScreen from '../GameDetailsScreen';
import CollectionScreen from './CollectionScreen';
import { PALETTE } from '../../services/theme';

const CollectionStack = createNativeStackNavigator();

function Collection() {
  return (
    <CollectionStack.Navigator>
      <CollectionStack.Screen
        name="Collection"
        children={() => <CollectionScreen />}
        options={{
          headerTintColor: '#dedbd6',
          headerStyle: { backgroundColor: PALETTE.five }
        }}
      ></CollectionStack.Screen>
      <CollectionStack.Screen
        name="Details"
        component={GameDetailsScreen}
        options={{
          headerBackTitle: '',
          headerTintColor: '#dedbd6',
          headerStyle: { backgroundColor: PALETTE.five }
        }}
      ></CollectionStack.Screen>
    </CollectionStack.Navigator>
  );
}

module.exports = Collection;
