var database = require("../database/config")

function pesquisar(search) {
    var instrucaoSql = `
        SELECT idFilme, path, titulo, dt_lancamento, popularidade, regiao.regiao, genero.nome_genero as genero FROM filme
        JOIN filme_genero ON filme.idFilme = filme_genero.fk_filme
        JOIN genero ON genero.idGenero = filme_genero.fk_genero
        JOIN poster ON filme.idFilme = poster.fk_filme
        JOIN titulo ON filme.idFilme = titulo.fk_filme
        JOIN regiao ON idRegiao = titulo.fk_regiao AND idRegiao = poster.fk_regiao
        WHERE (titulo.fk_regiao = 1) AND titulo LIKE '%${search}%'
        ORDER BY popularidade DESC
        LIMIT 300;
    `;
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisar_id(id, search) {
    var instrucaoSql = `
        SELECT idFilme, path, titulo, filme.dt_lancamento, popularidade, regiao.regiao, midia.tipo AS 'midia', genero.nome_genero as genero, dt_compra AS 'data', valor_compra  AS 'valor',  local_compra.local AS 'local' FROM filme
        JOIN filme_genero ON filme.idFilme = filme_genero.fk_filme
        JOIN genero ON genero.idGenero = filme_genero.fk_genero
        JOIN poster ON filme.idFilme = poster.fk_filme
        JOIN titulo ON filme.idFilme = titulo.fk_filme
        JOIN regiao ON idRegiao = titulo.fk_regiao AND idRegiao = poster.fk_regiao
        JOIN compra ON compra.fk_filme = filme.idFilme
        JOIN colecao ON fk_colecao = colecao.idColecao
        JOIN local_compra ON fk_local_compra = local_compra.id_local_compra
        JOIN midia ON fk_midia = midia.idMidia
        WHERE idColecao = '${id}' AND titulo.fk_regiao = 1 AND titulo like '%${search}%'
        ORDER BY popularidade DESC
        LIMIT 300;
    `;
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    pesquisar,
    pesquisar_id
};