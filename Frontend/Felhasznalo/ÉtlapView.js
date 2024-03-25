class ÉtlapView {
    #adat = {};
    constructor(adat, szuloElem, isKedvenc) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        this.isKedvenc = isKedvenc
        this.#sor();
    }

    #sor() {
        // Add a data-id attribute to the card div with the food item's ID
        const itemDiv = $(`<div class="card" data-id="${this.#adat.Etel_Azon}"></div>`);
        const imageDiv = $(`<div class="card-header"><img src="../kepek/hamburger.png" alt="${this.#adat.Elnevezes}"></div>`);
        const titlePriceDiv = $(`<div class="card-body"><p class="nev">${this.#adat.Elnevezes}</p><br><p class="ar">${this.#adat.Ar + " Ft"}</p></div>`);
        const footerdiv = $('<div class="card-footer"></div>');
        const starDiv = $('<div class="star"></div>');
        const buttonDiv = $('<button class="kosarbaad">🛒</button>');
        footerdiv.append(starDiv, buttonDiv)
        itemDiv.append(imageDiv, titlePriceDiv, footerdiv);
        this.tablaElem.append(itemDiv);
        if (this.isKedvenc) {
            starDiv.css('background-color', 'yellow');
        } else {
            starDiv.css('background-color', 'white');
        }
    
        
    }

}
export default ÉtlapView; 
