import ÉtlapView from "./ÉtlapView.js";

class Megjelenit {
  #list = [];

  constructor(list, szuloElem, isKedvenc) {
    this.#list = list;
    this.isKedvenc = isKedvenc

    const divContainer = $('<div class="categories-container"></div>');
    szuloElem.append(divContainer);
    this.tablaElem = divContainer;
    this.DivbeIr(isKedvenc);
  }

  DivbeIr(isKedvenc) {

    this.#list.forEach((kategoria) => {

      const sectionId = kategoria.Kategoria; 
      const categoryHeader = $(`<h2 id="${sectionId}">${kategoria.Kategoria}</h2>`);
      this.tablaElem.append(categoryHeader);


      const itemsDiv = $('<div class="items-container"></div>');
      this.tablaElem.append(itemsDiv);


      kategoria.Etelek.forEach((etel) => {
        new ÉtlapView(etel, itemsDiv, isKedvenc);
      });
    });
  }
}

export default Megjelenit;
