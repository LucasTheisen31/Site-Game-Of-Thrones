
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
                <div value="${e.nome}">
                    <label>${e.nome}<label>
                </div>
             </div>`
          );
        }
    );
    
    //document.getElementById ("form_quest").innerHTML = html;
    document.getElementById('comentarios').innerHTML = saida;

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
