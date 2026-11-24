// sessão
function validarSessaoFilm() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var buttons = document.getElementById("left");

    if (email != null && nome != null) {
        buttons.innerHTML += 
        '<a href="collection.html"><button class="collection attached_button">Coleção</button></a> <a href="dashboard.html"><button class="dash attached_button">Dashboard</button></a>';
    } else {
        console.log("não logado")
    }
}

function validarSessaoCollection() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var buttons = document.getElementById("left");

    if (email != null && nome != null) {
        buttons.innerHTML += 
        '<a href="collection.html"><button class="collection selected attached_button">Coleção</button></a> <a href="dashboard.html"><button class="dash attached_button">Dashboard</button></a>';
    } else {
        window.location = "../login.html";
    }
}

function validarSessaoAddFilm(){
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        return(true)
    }else{
        return(false)
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

/* // carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
} */

