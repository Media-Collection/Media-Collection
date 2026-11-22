var database = require("../database/config")

function genre(id) {
    var instrucaoSql = `
        SELECT genero.nome_genero AS 'genero', COUNT(genero.idGenero) AS 'total' FROM genero
        JOIN filme_genero ON filme_genero.fk_genero = genero.idGenero
        JOIN filme ON filme_genero.fk_filme = filme.idFilme
        JOIN compra ON compra.fk_filme = filme.idFilme
        JOIN colecao ON fk_colecao = colecao.idColecao
        WHERE colecao.idColecao = ${id}
        GROUP BY genero.idGenero
        ORDER BY total DESC;
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
        GROUP BY local_compra.local
        ORDER BY quantidade_local DESC;
    `;

    return database.executar(instrucaoSql);
}

function ano(id){
        var instrucaoSql = `
        SELECT decada AS 'ano', COUNT(*) AS 'quantidade_ano' FROM
        (SELECT floor(YEAR(dt_lancamento) / 10) * 10 AS 'decada' FROM filme
        JOIN compra ON compra.fk_filme = filme.idFilme
        JOIN colecao ON fk_colecao = colecao.idColecao
        WHERE colecao.idColecao = ${id}) d
        GROUP BY decada
        ORDER BY quantidade_ano DESC;
    `;

    return database.executar(instrucaoSql);
}

function timeline(id){
            var instrucaoSql = `
        SELECT dt_compra AS 'data', SUM(COUNT(fk_filme)) OVER (ORDER BY dt_compra) AS 'total' FROM compra 
        JOIN colecao ON fk_colecao = colecao.idColecao
        WHERE colecao.idColecao = ${id}
        GROUP BY dt_compra
        ORDER BY dt_compra;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    local_compra,
    timeline,
    genre,
    kpi,
    ano
}