var dadosModel = require("../models/dadosModel");

function genre(req, res) {
    var id = req.body.idServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        dadosModel.genre(id)
            .then((resultado)  => {
                    //console.log(`\nResultados encontrados: ${resultadoSearch.length}`);
                    //console.log(`Resultados: ${JSON.stringify(resultadoSearch)}`); // transforma JSON em String
                    if (resultado.length == 0){
                        console.log('Sem filmes cadastrados')
                        res.status(403).send("Sem filmes");
                    }
                    else{
                        console.log(resultado);
                        res.json(resultado);
                    }
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pesquisar o genero dos filmes! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function kpi(req, res){
    var id = req.body.idServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        dadosModel.kpi(id)
            .then((resultado)  => {
                    //console.log(`\nResultados encontrados: ${resultadoSearch.length}`);
                    //console.log(`Resultados: ${JSON.stringify(resultadoSearch)}`); // transforma JSON em String
                    if (resultado.length == 0){
                        console.log('Sem filmes cadastrados')
                        res.status(403).send("Sem filmes");
                    }
                    else{
                        console.log(resultado);
                        res.json(resultado);
                    }
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pesquisar o genero dos filmes! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
}

function local_compra(req, res){
    var id = req.body.idServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        dadosModel.local_compra(id)
            .then((resultado)  => {
                    //console.log(`\nResultados encontrados: ${resultadoSearch.length}`);
                    //console.log(`Resultados: ${JSON.stringify(resultadoSearch)}`); // transforma JSON em String
                    if (resultado.length == 0){
                        console.log('Sem filmes cadastrados')
                        res.status(403).send("Sem filmes");
                    }
                    else{
                        console.log(resultado);
                        res.json(resultado);
                    }
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pesquisar os locais de compra! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
}

function ano(req, res){
    var id = req.body.idServer;

    if (req == undefined) {
        res.status(400).send("Erro: undefined!");
    } else {
        dadosModel.ano(id)
            .then((resultado)  => {
                    //console.log(`\nResultados encontrados: ${resultadoSearch.length}`);
                    //console.log(`Resultados: ${JSON.stringify(resultadoSearch)}`); // transforma JSON em String
                    if (resultado.length == 0){
                        console.log('Sem filmes cadastrados')
                        res.status(403).send("Sem filmes");
                    }
                    else{
                        console.log(resultado);
                        res.json(resultado);
                    }
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pesquisar as datas de lançamento! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
}

module.exports = {
    local_compra,
    genre,
    kpi,
    ano
}