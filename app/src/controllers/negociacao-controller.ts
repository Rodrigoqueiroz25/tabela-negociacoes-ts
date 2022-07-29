import { domInjector } from "../decorators/dom-injector.js";

import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { logarTempoExecucao } from "../decorators/tempo-execucao.js";
import { imprimir } from "../utils/imprimir.js";


export class NegociacaoController{

    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector("#valor")
    private inputValor: HTMLInputElement;
    
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    private negociacoesService = new NegociacoesService();

    constructor(){
        this.negociacoesView.update(this.negociacoes);
    }


    public adiciona(): void {
        const negociacao = Negociacao.criaNegociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if(!this.ehDiaUtil(negociacao.data)){
             this.mensagemView.update('Apenas negociações feitas em dias úteis!');
             return;   
        }
        this.negociacoes.adiciona(negociacao);
        //imprimir(negociacao, this.negociacoes);
        this.atualizaView();
        this.limpaForm();   
    }

    @logarTempoExecucao()
    public importarDados(): void {
        this.negociacoesService
            .obterNegociacoes()
            .then(negociacoesHoje => {
                return negociacoesHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
                })
            })
            .then(negociacoesHoje => {
                for (const negociacao of negociacoesHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            })  
    }


    private ehDiaUtil(data: Date): boolean{
        return data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO;
    }

    

    private limpaForm(): void{
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();

    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }

}