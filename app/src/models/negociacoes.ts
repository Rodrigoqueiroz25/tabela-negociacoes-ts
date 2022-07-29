import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

//Array<Negociacao> = Negociacao[]
//ReadonlyArray<Negociacao> = readonly Negociacao[]
//return [...this.negociacoes]; //retornando outro objeto com mesmos elementos.

export class Negociacoes implements Modelo<Negociacoes>{
    

    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao): void{
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }


}

