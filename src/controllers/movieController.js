movieModel = require("../models/movieModel");

async function cadastrar_filme(id, title, release_date, genre_ids, caminho_imagem, caminho_imagem_us, title_us, popularity) {
    await movieModel.cadastrar_filme(id, title, release_date, caminho_imagem, caminho_imagem_us, title_us, popularity);
    
    if(genre_ids.length >= 1){
        await movieModel.cadastrar_filme_genero(id, genre_ids[0])
    }

}

module.exports = {
    cadastrar_filme
}