require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');
const app = Express();

const PORT = process.env.PORT || 3000;

app.use(cors()).use(morgan('short')).use(Express.json()).use(router);

app.listen(PORT, () => {
  console.log(`Up and running at http://localhost:${PORT}`);
});
