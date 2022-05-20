export function filterTileResult(res) {
  const basicTiles = res.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image
    };
  });
  const toPass = {
    next: res.next,
    results: basicTiles
  };
  return toPass;
}

export function filterSingleGameResult(res) {
  const platformList = res.platforms.map((single) => single.platform);
  let filteredDesc = res.description.replace(/<[^>]*>?/gm, '');
  filteredDesc = filteredDesc.slice().replace(/(&#39;s)/gm, '');

  const game = {
    id: res.id,
    name: res.name,
    slug: res.slug,
    description: filteredDesc,
    metacritic: res.metacritic,
    released: res.released,
    background_image: res.background_image,
    website: res.website,
    genres: res.genres,
    platforms: platformList,
    developers: res.developers
  };

  return game;
}
