//classe de validação dos campos
class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-equal',
            'data-password-validate',
          ],

          this.errors = true;
    }

    // inicia a validação de todos os campos
    validate(form) {

        // limpa todas as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            //chama o metodo cleanValidations passando as validaçoes, ou seja esse metodo vai limpar as validaçoes
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs do formulario
        let inputs = form.getElementsByTagName('input')//pega todos os elementos com a tag 'input'

        //Transforma em HTMLCollection -> array
        let inputsArray = [...inputs];//transforma os elementos de inputs em um array

        //loop nos inputs e validação mediante ao que for emcontrado
        inputsArray.forEach(function (input) {
            //ou seja aqui eu acesso todos os inputs do inputsArray
            //loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {
                //verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {
                    //transforma data-min-length em minlength
                    //limpa a string transformando 'data-min-length' em 'minlength' == nome do metodo, ou seja a variavel (method) vai apontar para o metodo de validacao do numero de caracteres.
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //pega o valor do input ex: data-min-length = '2', é esse valor '2'
                    let value = input.getAttribute(this.validations[i]);

                    //chama o metodo
                    this[method](input, value);
                }
            }
        }, this);
    }

    //metodo que verifica se um input é obrigatorio
    required(input) {
        //pega o valor do input (digitado)
        let inputValue = input.value;

        if (inputValue == '') {
            let errorMessage = 'Este campo é obrigatorio';
            this.printMessage(input, errorMessage);
        }
    }

    //metodo que verifica se um input tem um numero minimo de caracteres
    minlength(input, minValue) {
        //pega o num de caracteres do input (digitados)
        let inputLength = input.value.length;

        let errorMessage = 'O campo precisa ter pelo menos ' + minValue + ' caracteres';

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //metodo para verificar se o input passou o limite de caracteres
    maxlength(input, maxValue) {
        //pega o num de caracteres do input (digitados)
        let inputLength = input.value.length;

        let errorMessage = 'O campo precisa ter menos que ' + maxValue + ' caracteres';

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }

    }

    //valida se o campo possui apenas letras
    onlyletters(input){

        //variavel para verificar se so possui letras
        let re = /^[A-Za-z]+$/;

        //pega o valor do input (digitado)
        let inputValue = input.value;

        let errorMessage = 'Este campo não aceita numeros nem caracteres especiais'

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }

    //metodo que valida o email
    emailvalidate(input){
        
        //email@email.com ou email@email.com.br
        //variavel para verificar o formato do email
        let re = /\S+@\S+\.\S+/;

        //pega o valor do input (digitado)
        let email = input.value;

        let errorMessage = 'Insira um e-mail no padrão email@email.com'

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    //metodo que verifica se dois compos sao iguais
    equal(input, inputName){

        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = 'Este campo precisa estar igual ao '+inputName;

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }

    //metodo que valida se a senha possui caracteres maiusculos e numeros
    passwordvalidate(input) {

        // converte a string em um array de caracteres
        let charArr = input.value.split("");
    
        let uppercases = 0;
        let numbers = 0;
    
        for(let i = 0; charArr.length > i; i++) {
          if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
            uppercases++;
          } else if(!isNaN(parseInt(charArr[i]))) {
            numbers++;
          }
        }
    
        if(uppercases === 0 || numbers === 0) {
          let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
    
          this.printMessage(input, errorMessage);
        }
    
      }

    //metodo para imprimir menssagem na tela
    printMessage(input, message) {

        
        //quantidate de error que o input possui
        let errorsQtd = input.parentNode.querySelector('.error-validation');

        //verifica se ja nao esta exibindo um erro, para nao exibir mensagens de erro sobrepostos
        if (errorsQtd == null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            //muda o conteudo do texto do template
            template.textContent = message;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    //metodo remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}


let form = document.getElementById('registro-form');/* resgata o id do formulario*/
let botao = document.getElementById('botaoId');/* resgata o id do botao de cadastro */

let validator = new Validator();

//evento que dispara as validaçoes dos campos do formulario
//adiciona um evento ao botao
botao.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);//chama o metodo validate passando o formulario

});

