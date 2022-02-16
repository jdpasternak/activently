const express = require("express");
const controllers = require("./controllers");
const sequelize = require("./config/connection");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10, // will check every 10 min
    expiration: 1000 * 60 * 30, // will expire after 30 minutes
  }),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers);

app.use(session(sess))

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Server now listening on port 3001"));
});
