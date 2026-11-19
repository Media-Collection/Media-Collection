var database = require("../database/config")


function adicionar(id, filme, data, valor, local, midia) {
    var instrucaoSql = `
            INSERT INTO compra(fk_colecao, dt_compra, valor_compra, fk_local_compra, fk_midia, fk_filme) VALUES (${id}, '${data}', ${valor}, ${local}, ${midia}, ${filme});
    `;
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    adicionar
};