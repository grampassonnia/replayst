# replayst  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Is a mobile app that allows you to track your game collection and check it anywhere, anytime. Leveraging the RAWG api database, you can add almost any official or indie game ever released and say goodbye to double purchases. (<-- Yes, I'm guilty of it).

![favourites screen](https://github.com/grampassonnia/replayst/blob/master/compresspng/favourites.png?raw=true) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ![details screen](https://github.com/grampassonnia/replayst/blob/master/compresspng/details-min.png?raw=true)

---

### How to run locally:

#### from client folder:
- run `npm install` to install dependencies
- run `expo start` to start client

#### from server folder:
- run `npm install` to install dependencies
- start mongodb in your local environment
- run `npx nodemon index.js` to start the server

#### NOTES:
- expo client runs only on stable node versions (run `nvm use --lts` to switch to the latest one)
- user creation is not enabled in-app yet. To create a new user hit the `/register` endpoint with a post request using [Postman](https://www.postman.com) or a similar software. The body needs to be in json format. Data model and required fields can be found in **/server/models/user.js**
