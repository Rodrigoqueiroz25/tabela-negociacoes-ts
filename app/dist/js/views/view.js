export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw new Error(`seletor ${seletor} não existe no DOM, verifique!`);
        }
    }
    update(model) {
        this.elemento.innerHTML = this.template(model);
    }
}
//# sourceMappingURL=view.js.map