import TablazatView from "./TablazatView.js";


class Megjelenit {
  #list = [];

  constructor(list, szuloElem) {
    this.#list = list;
    
    szuloElem.append(`<table class="table table-bordered table-striped">`);
    this.tablaElem = szuloElem.children("table");
    console.log(this.#list)
    this.tablazatbaIr(); 
    
  }

tablazatbaIr() {
  let txt = "";
  this.#list.forEach((elem) => {
      const megjelenitSor = new TablazatView(elem, this.tablaElem);

    }
  );
}

}
export default Megjelenit;