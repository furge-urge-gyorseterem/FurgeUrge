class ÉtlapView {
    #adat = {};
    constructor(adat, szuloElem) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        this.#sor();
    }

    #sor() {
        const itemDiv = $('<div class="card"></div>');
        const imageDiv = $(`<div class="card-header"><img src="../kepek/hamburger.png" alt="${this.#adat.Elnevezes}"></div>`);
        const titlePriceDiv = $(`<div class="card-body">${this.#adat.Elnevezes}<br>${this.#adat.Ar+" Ft"}</div>`);
        const buttonDiv = $('<div class="card-footer"><button>🛒</button></div>');
        itemDiv.append(imageDiv, titlePriceDiv, buttonDiv);
        this.tablaElem.append(itemDiv);
    }
}
export default ÉtlapView; 