
var list = [];

//obter o endereço da página atual (URL) após o / ex: /1temporada.html
var dir = window.location.pathname;

//se tiver comentários armazenados localmente armazena eles na list, caso contrario retorna '[]' 
var list = JSON.parse(localStorage.getItem('comentarios' + dir) ?? '[]');

//chama a função para mostrar os comentários ja armazenados
mostrarComent();

//funcao para salvar os comentarios
function salvarComentario() {

    const formCom = document.getElementById('formCom');

    var comentario = document.formCom.textarea;
    if (comentario.value == '' || comentario.value.length < 2) {
        comentario.focus();
        return;
    }

    var nome = document.formCom.nome;
    if (nome.value == '' || nome.value.length < 2) {
        nome.focus();
        return;
    }

    var email = document.formCom.email;
    if (email.value == '' || !validateEmail(email.value)) {
        email.focus();
        return;
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    var sexo = document.formCom.sexo;
    if (sexo.value == '') {
        sexo.focus();
        return;
    }

    

    var notifEmail = document.formCom.checkbox;

    var checkboxNotificarEmail = false;

    if (notifEmail.checked) {
        checkboxNotificarEmail = true;
    }

    var dadosComentario = {
        comentario: comentario.value,
        nome: nome.value,
        email: email.value,
        sexo: sexo.value,
        checkboxNotificarEmail: checkboxNotificarEmail
    }

    //adiciona o coomentario em uma lista de comentarios
    list.push(dadosComentario);

    //armazena o comentario no localStorage -> comentario+caminhododiretorio
    localStorage.setItem('comentarios' + dir, JSON.stringify(list));

    alert('Comentário Registrado');

    console.log(list);

    //chama a função para mostrar os comentários armazenados
    mostrarComent();

}

function mostrarComent() {
    let saida = [];

    list.forEach((e) => {
        saida.push(
            `<div>
                <div class="comentario">
                    <div class="dados-autor-comentario"><b>Nome</b>: ${e.nome}<b> Email</b>: ${e.email} <b>Gênero:</b> ${e.sexo}</div>
                    <div class="texto-comentario"><b>Comentou:</b>${e.comentario}</div>
                </div>
             </div>`
        );
    }
    );
    document.getElementById('titulo-comentarios-container').innerHTML = `<h2>Comentários: ${list.length}</h2>`
    document.getElementById('comentarios').innerHTML = saida.join('');
}
