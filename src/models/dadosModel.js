var database = require("../database/config")

function genre(id) {
    var instrucaoSql = `
        SELECT genero.nome_genero AS 'genero', COUNT(genero.idGenero) AS 'total' FROM genero
        JOIN filme_genero ON filme_genero.fk_genero = genero.idGenero
        JOIN filme ON filme_genero.fk_filme = filme.idFilme
        JOIN compra ON compra.fk_filme = filme.idFilme
        JOIN colecao ON fk_colecao = colecao.idColecao
        WHERE colecao.idColecao = ${id}
        GROUP BY genero.idGenero;
    `;

    return database.executar(instrucaoSql);
}

function kpi(id){
    var instrucaoSql = `
        SELECT SUM(valor_compra) AS 'valor_total', COUNT(filme.idFilme) AS 'quantidade_total', AVG(valor_compra) AS 'valor_medio' FROM filme
        JOIN compra ON compra.fk_filme = filme.idFilme
        JOIN colecao ON compra.fk_colecao = colecao.idColecao
        WHERE colecao.idColecao = ${id};
    `;

    return database.executar(instrucaoSql);
}

function local_compra(id){
    var instrucaoSql = `
        SELECT local_compra.local AS 'local', COUNT(local_compra.id_local_compra) AS 'quantidade_local' FROM local_compra
        JOIN compra ON compra.fk_local_compra = local_compra.id_local_compra
        JOIN filme ON compra.fk_filme = filme.idFilme
        JOIN colecao ON compra.fk_colecao = colecao.idColecao
        WHERE colecao.idColecao = ${id}
        GROUP BY local_compra.local;
    `;

    return database.executar(instrucaoSql);
}

function ano(id){
        var instrucaoSql = `
        SELECT YEAR(dt_lancamento) AS 'ano', COUNT(YEAR(dt_lancamento)) AS 'quantidade_ano' FROM filme
        JOIN compra ON compra.fk_filme = filme.idFilme
        JOIN colecao ON fk_colecao = colecao.idColecao
        WHERE colecao.idColecao = ${id}
        GROUP BY YEAR(dt_lancamento)
        ORDER BY YEAR(dt_lancamento);
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    local_compra,
    genre,
    kpi,
    ano
}