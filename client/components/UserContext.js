import { createContext, useEffect, useState } from 'react';
import { getUserCollection } from '../services/DbClient';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [toRender, setToRender] = useState([]);
  const [rendered, setRendered] = useState('owned');
  const [owned, setOwned] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const ownedIds = owned && owned.map((tile) => tile.id);
  const wishIds = wishlist && wishlist.map((game) => game.id);
  const favsIds = favorites && favorites.map((game) => game.id);

  const value = {
    toRender: [toRender, setToRender],
    rendered: [rendered, setRendered],
    owned: [owned, setOwned],
    wishlist: [wishlist, setWishlist],
    favorites: [favorites, setFavorites],
    ownedIds: ownedIds,
    wishIds: wishIds,
    favsIds: favsIds
  };
  // set user Id for local database
  const userId = process.env.USER_ID;
  useEffect(() => {
    getUserCollection(userId).then((res) => {
      setToRender(res.owned);
      setOwned(res.owned);
      setFavorites(res.favorites);
      setWishlist(res.wishlist);
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
