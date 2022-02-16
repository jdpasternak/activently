// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const controllers = require("./controllers");
const sequelize = require("./config/connection");

const hbs = exphbs.create({});

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers);

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "process.env.DB_SECRET",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10, // will check every 10 min
    expiration: 1000 * 60 * 30, // will expire after 30 minutes
  }),
};

app.use(session(sess));

// Starts the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server now listening on: http://localhost:${PORT}`)
  );
});
