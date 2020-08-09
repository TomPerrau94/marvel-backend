// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// // Import de crypto-js pour la sécurisation de la requête vers l'API Marvel
// const MD5 = require("crypto-js/md5");

// // Récupérer l'ensemble des comics présents dans l'API Marvel
// router.get("/comics", async (req, res) => {
//   try {
//     const apiPublic = process.env.MARVEL_API_PUBLIC;
//     const apiSecret = process.env.MARVEL_API_SECRET;

//     // Sécurisation de la clé api secret
//     // Création d'un timestamp
//     const date = new Date();
//     const ts = date.getTime() / 1000;

//     // Création du hash demandé par l'API Marvel
//     const hash = MD5(ts + apiSecret + apiPublic);

//     // Gérer le comportement de la pagination
//     if (req.query.offset) {
//       // Requête vers l'API Marvel
//       const response = await axios.get(
//         `https://gateway.marvel.com/v1/public/comics?limit=100&offset=${req.query.offset}&orderBy=title&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
//       );
//       console.log(response.data.status);

//       // Réponse au client
//       res.status(200).json(response.data);
//     } else {
//       // Requête vers l'API Marvel
//       const response = await axios.get(
//         `https://gateway.marvel.com/v1/public/comics?limit=100&orderBy=title&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
//       );
//       console.log(response.data.status);

//       // Réponse au client
//       res.status(200).json(response.data);
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Rechercher un comic par titre
// router.get("/comics/search", async (req, res) => {
//   try {
//     const apiPublic = process.env.MARVEL_API_PUBLIC;
//     const apiSecret = process.env.MARVEL_API_SECRET;

//     // Sécurisation de l'api secret
//     // Création d'un timestamp
//     const date = new Date();
//     const ts = date.getTime() / 1000;

//     // Création du hash demandé par l'API Marvel
//     const hash = MD5(ts + apiSecret + apiPublic);

//     // Récupérer le titre entré dans la barre de recherche côté front
//     const titleSearched = encodeURI(req.query.titleStartsWith);
//     console.log(titleSearched);

//     // Gérer le comportement de la pagination
//     if (req.query.offset) {
//       // Requête vers l'API Marvel
//       const response = await axios.get(
//         `https://gateway.marvel.com/v1/public/comics?orderBy=title&offset=${req.query.offset}&titleStartsWith=${titleSearched}&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
//       );
//       console.log(response.data.status);

//       // Réponse au client
//       res.status(200).json(response.data);
//     } else {
//       // Requête vers l'API Marvel
//       const response = await axios.get(
//         `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${titleSearched}&ts=${ts}&apikey=${apiPublic}&hash=${hash}`
//       );
//       console.log(response.data.status);

//       // Réponse au client
//       res.status(200).json(response.data);
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Récupérer un comic en particulier
// router.get("/comics/:id", async (req, res) => {
//   try {
//     const apiPublic = process.env.MARVEL_API_PUBLIC;
//     const apiSecret = process.env.MARVEL_API_SECRET;

//     // Sécurisation de l'api secret
//     // Création d'un timestamp
//     const date = new Date();
//     const ts = date.getTime() / 1000;

//     // Création du hash demandé par l'API Marvel
//     const hash = MD5(ts + apiSecret + apiPublic);

//     // Requête vers l'API Marvel
//     const response = await axios.get(
//       `https://gateway.marvel.com/v1/public/comics/${req.params.id}?ts=${ts}&apikey=${apiPublic}&hash=${hash}`
//     );
//     console.log(response.data.status);

//     // Réponse au client
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import de crypto-js pour la sécurisation de la requête vers l'API Marvel
const MD5 = require("crypto-js/md5");

// Récupérer l'ensemble des personnages présents dans l'API Marvel
router.get("/comics", async (req, res) => {
  console.log("toto");
  try {
    console.log("toto");
    const apiPublic = process.env.MARVEL_API_PUBLIC;
    const apiSecret = process.env.MARVEL_API_SECRET;

    // Sécurisation de l'api secret
    // Création d'un timestamp
    const date = new Date();
    const ts = date.getTime() / 1000;

    // Création du hash demandé par l'API Marvel
    const hash = MD5(ts + apiSecret + apiPublic);

    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apiPublic}&hash=${hash}`
    );
    console.log(response.data.status);

    // Réponse au client
    res.status(200).json(response.data);
  } catch (error) {
    console.log("toto");
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

module.exports = router;
