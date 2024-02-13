import ÉtlapView from "./ÉtlapView.js";


class Megjelenit {
  #list = [];

  constructor(list, szuloElem) {
    this.#list = list;
    
    // Create a container div for all items
    const divContainer = $('<div class="items-container"></div>');
    szuloElem.append(divContainer);
    this.tablaElem = divContainer;
    this.DivbeIr();
  }

  DivbeIr() {
    console.log(this.#list);
    this.#list.forEach((elem) => {
      const megjelenitSor = new ÉtlapView(elem, this.tablaElem);
    });
  }
}

export default Megjelenit;