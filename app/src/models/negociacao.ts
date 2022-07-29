import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao>{

    constructor(
        private _data: Date, 
        public readonly quantidade: number, //propriedade publica em modo somente leitura == usar get.
        public readonly valor: number
    ){}
    
    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        return new Date(this._data.getTime()); //programacao defensiva.
    }

    public static criaNegociacao(data: string, quantidade: string, valor: string): Negociacao{
        return new Negociacao(
            new Date(data.replace(/-/g,',')),
            parseInt(quantidade),
            parseFloat(valor)
        );
    }

    public paraTexto(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `;
    }

    public ehIgual(negociacao: Negociacao): boolean{
        return this.data.getDate() === negociacao.data.getDate() 
            && this.data.getMonth() === negociacao.data.getMonth() 
            && this.data.getFullYear() === negociacao.data.getFullYear() 
    }
}

