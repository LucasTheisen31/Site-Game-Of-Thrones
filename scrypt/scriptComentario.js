
const formCom = document.getElementById('formCom');


var list = [];

 function regComentario(){
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var comentario = document.getElementById('textarea');
    var sexo = document.getElementById('sexo');
    var notifEmail = document.getElementById('checkbox');

    var dados = JSON.parse(localStorage.getItem('comentarios'));

    var checkboxNotificarEmail = false;

    if(notifEmail.checked){
        checkboxNotificarEmail = true;
    }

    var dadosComentario = {
         comentario: comentario.value,
         nome : nome.value,
         email : email.value,
         sexo : sexo.value,
         checkboxNotificarEmail : checkboxNotificarEmail
    }

    //dados.push(dadosComentario);
    
    // localStorage.setItem('comentarios', JSON.stringify(dados));
    //alert('Comentário Registrado');

    //console.log(localStorage);


    list.push(dadosComentario);

    alert('Comentário Registrado');

    console.log(list);

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
// 
//  const inputName = document.querySelector('input[name="name"]');
// 	const inputEmail = document.querySelector('input[name="email"]');

// 	const log = document.getElementById('log');

// 	//input.addEventListener('change', updateValue);

// 	function updateValue() {
// 	  //log.textContent = e.target.value;
	  
// 	  let p = { nome: inputName.value, email: inputEmail.value };
// 	  list.push(p);
// 	  console.log(list);
// 	}
