class ÉtlapView {
    #adat = {};
    constructor(adat, szuloElem, isKedvenc) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        this.isKedvenc = isKedvenc
        this.#sor();
    }

    #sor() {

        const itemDiv = $(`<div class="card" data-id="${this.#adat.Etel_Azon}"></div>`);
        const imageDiv = $(`<div class="card-header"><img src="../kepek/hamburger.png" alt="${this.#adat.Elnevezes}"></div>`);
        const titlePriceDiv = $(`<div class="card-body"><div class="nev"><p >${this.#adat.Elnevezes}</p></div><div class="info"><p>🛈</p></div><div class="ar"><p>${this.#adat.Ar + " Ft"}</p></div><div class="leiro"><p>${this.#adat.Leírás}</p></div></div>`);
        const footerdiv = $('<div class="card-footer"></div>');
        const starDiv = $('<div class="star-container"></div>');
        const starDiHatar = $('<div class="star-border"></div>');
        const starDiCsillag = $('<div class="star"></div>');
        const buttonDiv = $('<button class="kosarbaad">🛒</button>');
        starDiv.append(starDiHatar,starDiCsillag)
        footerdiv.append(starDiv, buttonDiv)

        itemDiv.append(imageDiv, titlePriceDiv, footerdiv);
        this.tablaElem.append(itemDiv);
        if (this.isKedvenc) {
            starDiCsillag.css('background-color', 'yellow');
        } else {
            starDiCsillag.css('background-color', 'white');
        }
    
        
    }

}
export default ÉtlapView; 
