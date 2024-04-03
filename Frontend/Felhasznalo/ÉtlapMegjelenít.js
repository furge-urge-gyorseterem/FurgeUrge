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
      // Add a header for each category
      const sectionId = kategoria.Kategoria; // Ensure the ID is in a proper format for an HTML id attribute
      const categoryHeader = $(`<h2 id="${sectionId}">${kategoria.Kategoria}</h2>`);
      this.tablaElem.append(categoryHeader);

      // Create a div for the items in this category
      const itemsDiv = $('<div class="items-container"></div>');
      this.tablaElem.append(itemsDiv);

      // Pass the itemsDiv as the parent element for each ÉtlapView
      kategoria.Etelek.forEach((etel) => {
        new ÉtlapView(etel, itemsDiv, isKedvenc);
      });
    });
  }
}

export default Megjelenit;
