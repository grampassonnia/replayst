# replayst

Is a mobile app that allows you to track your game collection and check it anywhere, anytime. Leveraging the RAWG api database, you can add almost any official or indie game ever released and say goodbye to double purchases. (<-- Yes, I'm guilty of it).

---

### How to run locally:

### from client folder:
- run `npm install` to install dependencies
- run `expo start` to start client

### from server folder:
- run `npm install` to install dependencies
- start mongodb in your local environment
- run `npx nodemon index.js` to start the server

### NOTES:
- expo client runs only on stable node versions (run `nvm use --lts` to switch to the latest one)
- user creation is not enabled in-app yet. To create a new user hit the `/register` endpoint with a post request using [Postman](https://www.postman.com) or a similar software. The body needs to be in json format. Data model and required fields can be found in **/server/models/user.js**
