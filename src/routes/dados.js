var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");

// Contagem de gêneros por filme na coleção (dashboard)
router.post("/genre", function (req, res) {
    dadosController.genre(req, res);
})

router.post("/kpi", function (req, res) {
    dadosController.kpi(req, res);
})

router.post("/local_compra", function (req, res) {
    dadosController.local_compra(req, res);
})

router.post("/ano", function (req, res) {
    dadosController.ano(req, res);
})

module.exports = router;