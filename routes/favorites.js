// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// // Import de crypto-js pour la sécurisation de la requête vers l'API Marvel
// const MD5 = require("crypto-js/md5");
// const { route } = require("./comics");

// // Récupérer les favorites présents dans les cookies
// router.get("/favorites", async (req, res) => {
//   try {
//     const apiPublic = process.env.MARVEL_API_PUBLIC;
//     const apiSecret = process.env.MARVEL_API_SECRET;

//     // Sécurisation de la clé api secret
//     // Création d'un timestamp
//     const date = new Date();
//     const ts = date.getTime() / 1000;

//     // Création du hash demandé par l'API Marvel
//     const hash = MD5(ts + apiSecret + apiPublic);

//     // // Récupérer les characters et comics en cookies
//     // const favoriteCharacters = req.query.favoriteCharacters;
//     // const favoriteComics = req.query.favoriteComics;

//     // Définition des requêtes à faire
//     const charactersUrl = `https://gateway.marvel.com/v1/public/characters?limit=20&ts=${ts}&apikey=${apiPublic}&hash=${hash}`;
//     const comicsUrl = `https://gateway.marvel.com/v1/public/comics?limit=20&ts=${ts}&apikey=${apiPublic}&hash=${hash}`;

//     const requestCharacters = await axios.get(charactersUrl);
//     const requestComics = await axios.get(comicsUrl);

//     Promise.all([requestCharacters, requestComics]).then(function (results) {
//       const characters = results[0];
//       const comics = results[1];
//     });
//     console.log(characters.data);
//     console.log(comics.data);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;
