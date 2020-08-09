const express = require("express");
const formidable = require("express-formidable");
// const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

// Import des routes
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");

// Initialisation des routes
app.use(charactersRoutes);
app.use(comicsRoutes);

// Lancement du serveur
app.listen(process.env.PORT, () => {
  console.log(`Server started on port : ${process.env.PORT}`);
});
