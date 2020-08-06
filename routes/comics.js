const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import de crypto-js pour la sécurisation de la requête vers l'API Marvel
const MD5 = require("crypto-js/md5");

// Récupérer l'ensemble des comics présents dans l'API Marvel
router.get("/comics", async (req, res) => {
  try {
    const apiPublic = process.env.MARVEL_API_PUBLIC;
    const apiSecret = process.env.MARVEL_API_SECRET;

    // Sécurisation de la clé api secret
    // Création d'un timestamp
    const date = new Date();
    const ts = date.getTime() / 1000;

    // Création du hash demandé par l'API Marvel
    const hash = MD5(ts + apiSecret + apiPublic);

    // Requête vers l'API Marvel
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?limit=100&orderBy=title&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
    );
    console.log(response.data.status);

    // Réponse au client
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rechercher un comic par titre
router.get("/search/comics", async (req, res) => {
  try {
    const apiPublic = process.env.MARVEL_API_PUBLIC;
    const apiSecret = process.env.MARVEL_API_SECRET;

    // Sécurisation de l'api secret
    // Création d'un timestamp
    const date = new Date();
    const ts = date.getTime() / 1000;

    // Création du hash demandé par l'API Marvel
    const hash = MD5(ts + apiSecret + apiPublic);

    // Récupérer le titre entré dans la barre de recherche côté front
    console.log(req.query.titleStartsWith);
    const titleSearched = req.query.titleStartsWith;
    console.log(titleSearched);

    // Requête vers l'API Marvel
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${titleSearched}&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
    );
    console.log(response.data.status);

    // Réponse au client
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
