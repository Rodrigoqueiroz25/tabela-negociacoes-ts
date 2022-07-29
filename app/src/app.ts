import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { View } from "./views/view.js";

const controller = new NegociacaoController();

const form = document.querySelector(".form");
if(form){
    form.addEventListener("submit", event => {
        event.preventDefault();
        controller.adiciona();
    });
}
else{
    throw new Error("Não foi possível inicializar a aplicação. Verifique se o form existe!");
    
}

const botaoImporta = document.querySelector('#botao-importa');
if(botaoImporta){
    botaoImporta.addEventListener('click', event =>{
        controller.importarDados();
    })
}
else {
    throw new Error("Botão importa não encontrado");
    
}



//problemas do js
//atribuir propriedade dinamicamente.
//informar erros apenas em runtime como o de não passar todos os argumentos no constructor.