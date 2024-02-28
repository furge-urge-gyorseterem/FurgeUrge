class ÉtlapView {
    #adat = {};
    constructor(adat, szuloElem) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        this.#sor();
    }

    #sor() {
        // Add a data-id attribute to the card div with the food item's ID
        const itemDiv = $(`<div class="card" data-id="${this.#adat.Etel_Azon}"></div>`);
        const imageDiv = $(`<div class="card-header"><img src="../kepek/hamburger.png" alt="${this.#adat.Elnevezes}"></div>`);
        const titlePriceDiv = $(`<div class="card-body"><p class="nev">${this.#adat.Elnevezes}</p><br><p class="ar">${this.#adat.Ar + " Ft"}</p></div>`);
        const buttonDiv = $('<div class="card-footer"><button class="kosarbaad">🛒</button></div>');
        itemDiv.append(imageDiv, titlePriceDiv, buttonDiv);
        this.tablaElem.append(itemDiv);
    }

}
export default ÉtlapView; 