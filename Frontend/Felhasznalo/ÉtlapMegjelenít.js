import ÉtlapView from "./ÉtlapView.js";

class Megjelenit {
  #list = [];

  constructor(list, szuloElem) {
    this.#list = list;
    
    // Create a container div for all categories
    const divContainer = $('<div class="categories-container"></div>');
    szuloElem.append(divContainer);
    this.tablaElem = divContainer;
    this.DivbeIr();
  }

  DivbeIr() {
    console.log(this.#list);
    this.#list.forEach((kategoria) => {
      // Add a header for each category
      const categoryHeader = $(`<h2>${kategoria.Kategoria}</h2>`);
      this.tablaElem.append(categoryHeader);

      // Create a div for the items in this category
      const itemsDiv = $('<div class="items-container"></div>');
      this.tablaElem.append(itemsDiv);

      // Pass the itemsDiv as the parent element for each ÉtlapView
      kategoria.Etelek.forEach((etel) => {
        new ÉtlapView(etel, itemsDiv);
      });
    });
  }
}

export default Megjelenit;
