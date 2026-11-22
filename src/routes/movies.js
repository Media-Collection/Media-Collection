var express = require("express");
var router = express.Router();

var movie_searchController = require("../controllers/movie_searchController");
var movie_addController = require("../controllers/movie_addController")

// Pesquisa sem filtro de usuário. Todos os filmes.
router.post("/pesquisar", function (req, res) {
    movie_searchController.pesquisar(req, res);
})

// Pesquisa pela coleção do usuário (colecao = id)
router.post("/buscar/:search", function (req, res) {
    movie_searchController.pesquisar_id(req, res);
});

router.post("/adicionar", function (req, res) {
    movie_addController.adicionar(req, res);
});

router.post("/retirar", function (req, res) {
    console.log("AAAAAAAA")
    movie_addController.remover(req, res);
});

module.exports = router;