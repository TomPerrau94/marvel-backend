const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import de crypto-js pour la sécurisation de la requête vers l'API Marvel
const MD5 = require("crypto-js/md5");

// Récupérer l'ensemble des personnages présents dans l'API Marvel
router.get("/", async (req, res) => {
  try {
    const apiPublic = process.env.MARVEL_API_PUBLIC;
    const apiSecret = process.env.MARVEL_API_SECRET;

    // Sécurisation de l'api secret
    // Création d'un timestamp
    const date = new Date();
    const ts = date.getTime() / 1000;

    // Création du hash demandé par l'API Marvel
    const hash = MD5(ts + apiSecret + apiPublic);

    // Gérer le comportement de la pagination
    if (req.query.offset) {
      // Requête vers l'API Marvel
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?limit=100&offset=${req.query.offset}&orderBy=name&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
      );
      console.log(response.data.status);

      // Réponse au client
      res.status(200).json(response.data);
    } else {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?limit=100&orderBy=name&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
      );
      console.log(response.data.status);

      // Réponse au client
      res.status(200).json(response.data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les comics liés à un personnage
router.get("/:id/comics", async (req, res) => {
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
      `https://gateway.marvel.com/v1/public/characters/${req.params.id}/comics?orderBy=title&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
    );
    console.log(response.data.status);

    // Réponse au client
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rechercher un personnage par nom
router.get("/characters/search", async (req, res) => {
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
    const nameSearched = encodeURI(req.query.nameStartsWith);
    console.log(nameSearched);

    // Gérer le comportement de la pagination
    if (req.query.offset) {
      // Requête vers l'API Marvel
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?offset=${req.query.offset}&nameStartsWith=${nameSearched}&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
      );
      console.log(response.data.status);

      // Réponse au client
      res.status(200).json(response.data);
    } else {
      // Requête vers l'API Marvel
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${nameSearched}&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
      );
      console.log(response.data.status);

      // Réponse au client
      res.status(200).json(response.data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
