var database = require("../database/config")


function adicionar(id, filme) {
    var instrucaoSql = `
            INSERT INTO compra(fk_colecao, dt_compra, valor_compra, fk_local_compra, fk_midia, fk_filme) VALUES (${id}, '2026-11-13', 25.99, 1, 1, ${filme});
    `;
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    adicionar
};