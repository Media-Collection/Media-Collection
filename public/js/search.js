var max_filmes = 14;
var pag_num = 1;


let titulos = [];
let data_lancamento = [];
let generos = [];
let id_filme = [];
let local = [];
let midia = [];
let pos = 0;

let max_pag = 0;


function check_fullscreen() {
    if (window.innerHeight == screen.height) {
        max_filmes = 12;
    } else {
        max_filmes = 14;
    }
}

function search_id() {
    check_fullscreen()
    var search = ipt_filme.value;
    var id = sessionStorage.ID_USUARIO;

    titulos = [];
    data_lancamento = [];
    ano_lancamento = [];
    genero = [];
    id_filme = [];
    poster = [];
    valor = [];
    dt_compra = [];
    local = [];
    midia = [];

    pos = 0;

    fetch(`/movies/buscar/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: id,
            searchServer: search
        })
    })

        .then((resposta) => {
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json.length, max_filmes)
                    let max_pag = Math.ceil(json.length / max_filmes)

                    if (max_pag == 0) {
                        max_pag = 1
                    }

                    msg.innerHTML = '';

                    for (let i = (max_filmes * (pag_num) - max_filmes); i < (max_filmes * pag_num) && i <= json.length - 1; i++, pos++) {
                        let data = new Date(json[i].dt_lancamento);
                        let data_compra = new Date(json[i].data);
                        let genero = json[i].genero;

                        titulos.push(json[i].titulo);
                        data_lancamento.push(data.toLocaleDateString("pt-BR"));
                        generos.push(genero);
                        id_filme.push(json[i].idFilme);
                        valor.push(json[i].valor);
                        dt_compra.push(data_compra.toLocaleDateString("pt-BR"));
                        local.push(json[i].local);
                        midia.push(json[i].midia);

                        ano_lancamento.push(data.getFullYear());
                        poster.push(json[i].path);
                        

                        draw(json.length);
            }
        })
        }
            else {
                msg.innerHTML = `<div class="movie_div" id=""> <img class="poster"> <label class="movie_title">Nenhum filme encontrado...</label> <label class="year"></label> </div>`
                page_button.innerHTML = `<button id="1" onclick="page_change(this.id)" class="selected"> 1 </button>`;
            }
        })
}


if (!sessionStorage.LAST_DATE_USUARIO || !sessionStorage.LAST_VALUE_USUARIO) {
    sessionStorage.LAST_DATE_USUARIO = '2026-01-01';
    sessionStorage.LAST_VALUE_USUARIO = '0';
}

function search() {
    check_fullscreen()
    var search = ipt_filme.value;
    titulos = [];
    data_lancamento = [];
    ano_lancamento = [];
    genero = [];
    id_filme = [];
    poster = [];
    pos = 0;


    fetch("/movies/pesquisar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            searchServer: search,
        })
    })

        .then((resposta) => {
            if (resposta.ok) {
                resposta.json().then(json => {
                    max_pag = (json.length / max_filmes).toFixed(0)

                    if (max_pag == 0) {
                        max_pag = 1
                    }

                    msg.innerHTML = '';

                    for (let i = 0; i <= json.length - 1; i++) {
                        let data = new Date(json[i].dt_lancamento);
                        let genero = json[i].genero

                        titulos.push(json[i].titulo);
                        data_lancamento.push(data.toLocaleDateString("pt-BR"));
                        ano_lancamento.push(data.getFullYear());
                        generos.push(genero);
                        id_filme.push(json[i].idFilme);
                        poster.push(json[i].path);
                    }

                    draw(json.length);


                })
            }else{
                msg.innerHTML = `<div class="movie_div" id=""> <img class="poster"> <label class="movie_title">Nenhum filme encontrado...</label> <label class="year"></label> </div>`
                page_button.innerHTML = `<button id="1" onclick="page_change(this.id)" class="selected"> 1 </button>`;
            }
        }
        )
}


function draw(length) {
    check_fullscreen()
    msg.innerHTML = '';
    let filmes = ``;


    for (let pos = (pag_num - 1) * max_filmes; pos <= ((pag_num - 1) * max_filmes - 1) + max_filmes && pos < length; pos++) {
        filmes += `<div class="movie_div" id="${pos}" onclick="exibir(this.id)" onmouseover="""> <img class="poster" src="https://image.tmdb.org/t/p/original/${poster[pos]}"> <label class="movie_title">${(titulos[pos])}</label> <label class="year">(<b>${generos[pos]}</b> - ${ano_lancamento[pos]})</label> </div>`
    }

    msg.innerHTML = filmes;
    paginas();
}

function draw_collection(length)  {
    check_fullscreen()
    msg.innerHTML = '';
    let filmes = ``;

    for (let pos = (pag_num - 1) * max_filmes; pos <= ((pag_num - 1) * max_filmes - 1) + max_filmes && pos < length; pos++) {
        if (midia[pos] == 'DVD') {
            filmes += `<div class="movie_div" id="${pos}" onclick="exibir(this.id)"> <img class="poster" src="https://image.tmdb.org/t/p/original/${poster[pos]}"> <label class="movie_title">${titulos[pos]}</label> <label class="year">(<b>${generos[pos]}</b> - ${ano_lancamento[pos]})</label> </div>`
        } else {
            filmes += `<div class="movie_div" id="${pos}" onclick="exibir(this.id)"> <img class="poster_blue" src="https://image.tmdb.org/t/p/original/${poster[pos]}"> <label class="movie_title">${titulos[pos]}</label> <label class="year">(<b>${generos[pos]}</b> - ${ano_lancamento[pos]})</label> </div>`
        }        
    }

    msg.innerHTML = filmes;
    paginas();
}

function paginas() {
    let page_buttons = '';
    let count_button = 2;

    if (pag_num > 2) {
        page_buttons += `<button id="1" onclick="page_change(this.id)" style="margin-right: 30px"> 1 </button>`
    }

    if (pag_num != 1) {
        page_buttons += `<button id="${pag_num - 1}" onclick="page_change(this.id)" class=""> ${pag_num - 1} </button>`
        count_button = 1;
    }

    for (let pag = Number(pag_num); pag <= pag_num + count_button && pag <= max_pag; pag++) {
        if (pag == pag_num) {
            page_buttons += `<button id="${pag}" onclick="page_change(this.id)" class="selected"> ${pag} </button>`
        }
        else {
            page_buttons += `<button id="${pag}" onclick="page_change(this.id)"> ${pag} </button>`
        }
    }

    if ((pag_num + count_button) < max_pag) {
        page_buttons += `<button id="${max_pag}" onclick="page_change(this.id)" style="margin-left: 30px"> ${max_pag} </button>`
    }

    page_button.innerHTML = page_buttons;
}


