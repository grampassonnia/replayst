const baseURL = process.env.BASE_URL;

export async function getUserCollection(id) {
  return fetch(`${baseURL}/list/${id}`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => console.error(err, err.message));
}

export async function addGameToCollection(user, game, list) {
  return fetch(`${baseURL}/owned/${user}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game: game, list: list })
  })
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => console.error(err, err.message));
}

export async function removeFromCollection(user, gameId, list) {
  return fetch(`${baseURL}/owned/${user}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id: gameId, list: list })
  })
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => console.error(err, err.message));
}
