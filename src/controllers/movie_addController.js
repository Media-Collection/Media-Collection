var movie_addModel = require("../models/movie_addModel")

function adicionar(req, res) {
    var id = req.body.idServer;
    var filme = req.body.filmeServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        movie_addModel.adicionar(id, filme)
            .then((resultado) => {
                console.log(`Filme ${filme} adicionado à coleção ${id}`)
                res.status(200).send("Filme adicionado com sucesso");
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao adicionar os filmes! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

module.exports = {
    adicionar
}