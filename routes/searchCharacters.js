const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import de crypto-js pour la sécurisation de la requête vers l'API Marvel
const MD5 = require("crypto-js/md5");

// Rechercher un personnage par nom
router.get("/search/characters", async (req, res) => {
  try {
    const apiPublic = process.env.MARVEL_API_PUBLIC;
    const apiSecret = process.env.MARVEL_API_SECRET;

    // Sécurisation de l'api secret
    // Création d'un timestamp
    const date = new Date();
    const ts = date.getTime() / 1000;

    // Création du hash demandé par l'API Marvel
    const hash = MD5(ts + apiSecret + apiPublic);

    // Récupérer le nom entré dans la barre de recherche côté front
    // const nameSearched = new RegExp(req.query.name, "i");
    console.log(req.query.name);
    const nameSearched = req.query.name;
    console.log(nameSearched);

    // Requête vers l'API Marvel
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=${nameSearched}&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
    );
    console.log(response.data.status);

    // Réponse au client
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
