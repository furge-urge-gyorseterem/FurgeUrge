
import DataService from "./DataService.js";
import Megjelenit from "./ÉtlapMegjelenít.js";
class Controller {
  constructor() {
    this.kosarTartalom = {};
    this.dataService = new DataService();
    this.dataService.getAxiosData(
      "http://localhost:8000/api/eteleink",
      this.megjelenites,
      this.hibakezeles,
      console.log("igen2")
    );
    this.kosarelem = $(".kosarbaad");

    console.log("igen");
    $(document).on("click", ".kosarbaad", (event) => {
      event.preventDefault();
      const termekNeve = $(event.currentTarget)
        .closest(".card")
        .find(".nev")
        .text()
        .trim();
      const termekAra = parseInt(
        $(event.currentTarget).closest(".card").find(".ar").text().trim(),
        10
      );
      const termekID = $(event.currentTarget)
      .closest(".card")
      .data("id");
      this.kosarbaHozzaadas(termekNeve, termekAra, termekID);

      // Frissítsd a kosár UI-t
      this.kosarUIFrissites();
    });
  }
  kosarbaHozzaadas(termekNeve, termekAra, termekID) {
    if (this.kosarTartalom[termekNeve]) {
        this.kosarTartalom[termekNeve].darab++;
    } else {
        this.kosarTartalom[termekNeve] = {
            id: termekID, // Store the ID here
            ar: termekAra,
            darab: 1,
        };
    }
}

  kosarUIFrissites() {
    const kosarDiv = $(".kosar");
    kosarDiv.empty();

    const kosarTermeknevekDiv = $('<div class="kosar-termeknevek"></div>');
    const kosarArakDiv = $('<div class="kosar-arak"></div>');
    const kosarDarabszamokDiv = $('<div class="kosar-darabszamok"></div>');
    const kosarMennyisegValtoztatoDiv = $(
      '<div class="kosar-mennyiseg-valtoztato"></div>'
    );

    Object.entries(this.kosarTartalom).forEach(([termekNeve, adatok]) => {
      kosarTermeknevekDiv.append($(`<div>${termekNeve}</div>`));
      kosarArakDiv.append($(`<div>${adatok.ar} Ft</div>`));

      const darabDiv = $("<div>").append($(`<span>${adatok.darab} db</span>`));
      kosarDarabszamokDiv.append(darabDiv);

      const minuszGomb = $("<button>")
        .text("-")
        .addClass("darab-csokkento")
        .on("click", () => this.kosarDarabValtoztat(termekNeve, "csokkent"));
      const pluszGomb = $("<button>")
        .text("+")
        .addClass("darab-novelo")
        .on("click", () => this.kosarDarabValtoztat(termekNeve, "novel"));
      const mennyisegValtoztatoDiv = $("<div>").append(minuszGomb, pluszGomb);
      kosarMennyisegValtoztatoDiv.append(mennyisegValtoztatoDiv);
    });

    kosarDiv.append(
      kosarTermeknevekDiv,
      kosarArakDiv,
      kosarDarabszamokDiv,
      kosarMennyisegValtoztatoDiv
    );

    if (Object.keys(this.kosarTartalom).length > 0) {
      const rendelesGomb = $("<button>")
        .text("Rendelés")
        .addClass("rendeles-gomb")
        .on("click", this.veglegesites.bind(this));
      kosarDiv.append(rendelesGomb);
    }
  }

  // Egy új függvény a darabszám változtatására
  kosarDarabValtoztat(termekNeve, valtozas) {
    if (valtozas === "novel") {
      if (this.kosarTartalom[termekNeve]) {
        this.kosarTartalom[termekNeve].darab += 1;
      }
    } else {
      if (this.kosarTartalom[termekNeve]) {
        this.kosarTartalom[termekNeve].darab =
          this.kosarTartalom[termekNeve].darab - 1;
      }
    }
    if (this.kosarTartalom[termekNeve].darab <= 0) {
      delete this.kosarTartalom[termekNeve];
    }

    this.kosarUIFrissites(); // Frissítjük a kosár UI-t

  }

  megjelenites(list) {
    const szuloElem = $(".tarolo");
    const megjelenito = new Megjelenit(list, szuloElem);
  }
  hibakezeles(uzenet) {
    console.log(uzenet);
  }
  veglegesites() {
    const szallitas = {
      Megrendelő_id: 1,
      Futár_id: 2,
      Szállítás_költség: 1500,
    }
    this.szallitasHozzaadas(szallitas)

    this.lekerMaxRendelesAzon();
  }
  
  szallitasHozzaadas(etelData) {
    this.dataService.postData(
      "http://localhost:8000/api/szallitas/add",
      etelData,
      (response) => {
        console.log("Étel hozzáadva:", response);
      },
      (error) => {
        console.error("Hiba az étel hozzáadásakor:", error);
      }
    );
    this.lekerMaxRendelesAzon();
  }
  megrendeltHozzaadas(megrendeltData) {
    this.dataService.addMegrendeltItem(
      "http://localhost:8000/api/megrendeltek",
      megrendeltData,
      (response) => {
        console.log("Megrendelt hozzáadva:", response);
      },
      (error) => {
        console.error("Hiba a megrendelt hozzáadásakor:", error);
      }
    );
  }
  lekerMaxRendelesAzon() {
    this.dataService.getMaxRendelesAzon(
      "http://localhost:8000/api/szallitas/maxazon",
      (data) => {
        console.log("A legnagyobb Rendeles_Azon:", data.Rendeles_Azon);
        const nextRendelesAzon = data.Rendeles_Azon + 1;
        Object.entries(this.kosarTartalom).forEach(([termekNeve, adatok]) => {
          const rendeles = {
            Rendeles_Azon: nextRendelesAzon,
            Etel_Azon: adatok.id,
            mennyiseg: adatok.darab,
          };
          this.megrendeltHozzaadas(rendeles);
        });
      },
      (error) => {
        console.error("Hiba a legnagyobb Rendeles_Azon lekérésekor:", error);
      }
    );
  }
}
export default Controller;