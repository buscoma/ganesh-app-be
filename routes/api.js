const express = require("express");
const comprensionLectora = require("./api/games/comprensionLectora");
const juegoNumAPalabra = require("./api/games/juegoNumAPalabra");
const palabrasPerdidas = require("./api/games/palabrasPerdidas");
const burgerBuilder = require("./api/games/burgerBuilder");
const secuenciaNumeros = require("./api/games/secuenciaNumeros");
const palabrasCorrectas = require("./api/games/palabrasCorrectas");
const player = require("./api/player");
const router = express.Router();

// player api
router.use("/player", player);

// games api
[
	comprensionLectora,
	juegoNumAPalabra,
	palabrasPerdidas,
	burgerBuilder,
	secuenciaNumeros,
	palabrasCorrectas,
].forEach((juego) => router.use("/games", juego));

module.exports = router;
