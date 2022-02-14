// Dependencies
const express = require("express");
const exphbs = require('express-handlebars');
const controllers = require("./controllers");
const sequelize = require("./config/connection");

const hbs = exphbs.create({});

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers);

// Starts the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server now listening on: http://localhost:${PORT}`));
});
