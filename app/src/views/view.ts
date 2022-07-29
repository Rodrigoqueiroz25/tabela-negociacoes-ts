import { inspect } from "../decorators/inspect.js";
import { logarTempoExecucao } from "../decorators/tempo-execucao.js";

export abstract class View<T>{

    protected elemento: HTMLElement;

    constructor(seletor: string){
        const elemento = document.querySelector(seletor);
        if(elemento){
            this.elemento = elemento as HTMLElement;
        }
        else{
            throw new Error(`seletor ${seletor} não existe no DOM, verifique!`);
        }
    }

    
    public update(model: T): void{
        this.elemento.innerHTML = this.template(model);
    }


    protected abstract template(model: T): string;
}