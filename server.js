const express = require("express");
const controllers = require("./controllers");
const sequelize = require("./config/connection");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "process.env.DB_SECRET",
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10, // will check every 10 min
    expiration: 1000 * 60 * 30, // will expire after 30 minutes
  }),
};
// Dependencies

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers);
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sess));

// Starts the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server now listening on: http://localhost:${PORT}`));
});
