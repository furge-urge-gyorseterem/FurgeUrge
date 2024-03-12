
import DataService from "./DataService.js";
import Megjelenit from "./ÉtlapMegjelenít.js";
class Controller {
  constructor() {
    this.kosarTartalom = {};
    this.kedvencekNevei = {};
    this.dataService = new DataService();
    this.dataService.getAxiosData(
      "http://localhost:8000/api/kategoria",
      this.megjeleniteskategoria,
      this.hibakezeles,
    );
    this.dataService.getAxiosData(
      "http://localhost:8000/api/kedvencek/1",
      (response) => {
        // Itt dolgozzuk fel a választ
        response.forEach(kedvenc => {
          // Hozzáadás a kedvencekNevei objektumhoz
          this.kedvencekNevei[kedvenc.Etel_Azon] = kedvenc.etel.Elnevezes;
        });
        // Itt hívjuk meg a megjelenítésre szolgáló függvényt
        this.megjeleniteskedvenc(response);
      },
      this.hibakezeles
    );
    this.dataService.getAxiosData(
      "http://localhost:8000/api/etelek",
      (response) => this.etelekMegjelenitesKedvencekNelkul(response),
      this.hibakezeles,
    );


    $(document).on('click', '.star', (event) => { // Changed to arrow function
      var cardDivDataId = $(event.currentTarget).closest('.card').data('id');
      const isWhite = $(event.currentTarget).css('background-color') === 'rgb(255, 255, 255)';
      $(event.currentTarget).css('background-color', isWhite ? 'yellow' : 'white');
      if (isWhite) {
        const kedvencek = {
          Felhasznalo_Azon: 1,
          Etel_Azon: cardDivDataId,
        };
        this.kedvenchezfuzes(kedvencek); // 'this' now correctly refers to the Controller instance
      }else{
        const Felhasznalo_Azon= 1
        const Etel_Azon = cardDivDataId
        this.dataService.deleteAxiosData('http://localhost:8000/api/kedvencek', Felhasznalo_Azon, Etel_Azon)
      }
    });
    const kosarContainer = $('.kosar-container');

    kosarContainer.css('display', 'none');
    this.kosarelem = $(".kosarbaad");
    $(document).ready(function () {

      var navOriginalPos = $('nav').offset().top;

      var kosarHeight = $('.kosar-container').outerHeight();
      var navHeight = $('nav').outerHeight();


      $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();

        if (scrollDistance >= navOriginalPos) {
          $('.kosar-container').css({
            position: 'sticky',
            top: '60px',
            width: '450px'
          });
        } else {
          $('.kosar-container').css({
            position: 'static',
            top: '',
            left: '',
            right: '',
            width: ''
          });
        }
      });
      $(window).scroll(function () {
        if ($(window).scrollTop() > navOriginalPos) {
          $('nav').addClass('fixed');
          $('body').css('padding-top', navHeight + 'px');

          $('main').css('padding-top', kosarHeight + 'px');
        } else {
          $('nav').removeClass('fixed');

          $('main').css('padding-top', '0');
          $('body').css('padding-top', '0');
        }

      });
    });

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
  etelekMegjelenitesKedvencekNelkul(etelekResponse) {
    const tisztitottEtelek = etelekResponse.map(kategoria => {
      const tisztitottEtelek = kategoria.Etelek.filter(etel => {
        // Visszaadja azokat az ételeket, amelyek nem szerepelnek a kedvencek között
        return !Object.values(this.kedvencekNevei).includes(etel.Elnevezes);
      });

      return {
        ...kategoria,
        Etelek: tisztitottEtelek
      };
    });

    // Itt meghívhatod a megjelenítő függvényt a tisztított ételek listájával
    this.megjelenites(tisztitottEtelek);
  }
  kedvenchezfuzes(kedvencek){
    this.dataService.postData(
      "http://localhost:8000/api/kedvencek",
      kedvencek,
      (response) => {
        console.log("Étel hozzáadva:", response);
      },
      (error) => {
        console.error("Hiba az étel hozzáadásakor:", error);
      }
    )

  }
  toggleKosarContainerDisplay() {
    // Check if the cart is empty by checking the number of keys in kosarTartalom
    const kosarUres = Object.keys(this.kosarTartalom).length === 0;

    // Select the kosar-container element
    const kosarContainer = $('.kosar-container');

    // Toggle the display property based on whether the cart is empty
    if (kosarUres) {
      kosarContainer.css('display', 'none');
    } else {
      kosarContainer.css('display', '');
    }
  }
  kosarbaHozzaadas(termekNeve, termekAra, termekID) {
    if (this.kosarTartalom[termekNeve]) {
      this.kosarTartalom[termekNeve].darab++;
    } else {
      this.kosarTartalom[termekNeve] = {
        id: termekID,
        ar: termekAra,
        darab: 1,
      };
    }
    this.toggleKosarContainerDisplay();
  }

  kosarUIFrissites() {
    const kosarDiv = $(".kosar");
    const rendelesosszeg = $(".rendeles-osszeg");
    kosarDiv.empty();
    rendelesosszeg.empty();
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

    // Append total amount before the "Rendelés" button


    kosarDiv.append(
      kosarTermeknevekDiv,
      kosarArakDiv,
      kosarDarabszamokDiv,
      kosarMennyisegValtoztatoDiv
    );


    const actionDiv = $('<div class="kosar-akcio"></div>');

    // If there are items in the cart, append the "Rendelés" button and total to actionDiv
    if (Object.keys(this.kosarTartalom).length > 0) {
      const rendelesGomb = $("<button>")
        .text("Rendelés")
        .addClass("rendeles-gomb")
        .on("click", this.veglegesites.bind(this));
      const totalAmount = this.calculateTotal();
      const totalDiv = $('<div class="kosar-osszeg">Összeg: ' + totalAmount + ' Ft</div>');

      actionDiv.append(rendelesGomb, totalDiv);
    }

    rendelesosszeg.append(actionDiv)
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
    this.toggleKosarContainerDisplay();
  }
  calculateTotal() {
    let total = 0;
    for (let key in this.kosarTartalom) {
      total += this.kosarTartalom[key].ar * this.kosarTartalom[key].darab;
    }
    return total;
  }
  megjelenites(list) {
    const szuloElem = $(".tarolo");
    const megjelenito = new Megjelenit(list, szuloElem, false);
  }
  megjeleniteskategoria(list) {
    const ul = $('.etelkategoriak');

    list.forEach(Kategoria => {
      const li = $('<li></li>').text(Kategoria.Kategoria);

      ul.prepend(li);
    });

    // No need to append the ul to the document since it's already in place,
    // just populated it with the new <li> items.
  }
  hibakezeles(uzenet) {
    console.log(uzenet);
  }
  veglegesites() {
    const totalKosarOsszeg = this.calculateTotal();
    const szallitas = {
      Megrendelő_id: 1,
      Futár_id: 2,
      Szállítás_költség: totalKosarOsszeg,
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
  megjeleniteskedvenc(kedvencekLista) {
    const szuloElem = $(".tarolo");
    // Az 'etel' objektumokat egy tömbbe gyűjti, amihez hozzáadja a "Kedvencek" kategóriát
    const kedvencekObj = {
      Kategoria: "Kedvencek",
      Etelek: kedvencekLista.map(kedvenc => kedvenc.etel)
    };

    // A 'Megjelenit' konstruktorát meghívja egy tömbbel, ami csak a kedvencekObj objektumot tartalmazza
    new Megjelenit([kedvencekObj], szuloElem, true);

  }
}

export default Controller;