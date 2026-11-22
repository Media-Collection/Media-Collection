var movie_addModel = require("../models/movie_addModel")

function adicionar(req, res) {
    var id = req.body.idServer;
    var filme = req.body.filmeServer;
    var data = req.body.dataServer;
    var valor = req.body.valorServer;
    var local = req.body.localServer;
    var midia = req.body.midiaServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        movie_addModel.adicionar(id, filme, data, valor, local, midia)
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

function remover(req, res){
    var id = req.body.idServer;
    var id_filme = req.body.filme_idServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        movie_addModel.remover(id, id_filme)
            .then((resultado) => {
                console.log(resultado)
                console.log(`Filme ${id_filme} removido da coleção ${id}`)
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao remover o filme da coleção! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

module.exports = {
    adicionar,
    remover
}