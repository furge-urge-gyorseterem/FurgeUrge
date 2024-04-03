
import DataService from "./DataService.js";
import Megjelenit from "./ÉtlapMegjelenít.js";
class Controller {
  constructor() {
    this.kosarTartalom = {};
    this.kedvencekNevei = {};
    this.dataService = new DataService();

    const id = localStorage.getItem('userid');

    this.dataService.getAxiosData(
      `http://localhost:3000/api/kedvencek/${id}`,
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
      "http://localhost:3000/api/kategoria",
      (list) => this.megjeleniteskategoria(list),
      this.hibakezeles,
    );
    this.dataService.getAxiosData(
      "http://localhost:3000/api/etelek",
      (response) => this.etelekMegjelenitesKedvencekNelkul(response),
      this.hibakezeles,
    );
    $(document).on('click', '.star', (event) => { // Changed to arrow function
      var cardDivDataId = $(event.currentTarget).closest('.card').data('id');
      const isWhite = $(event.currentTarget).css('background-color') === 'rgb(255, 255, 255)';
      $(event.currentTarget).css('background-color', isWhite ? 'yellow' : 'white');
      if (isWhite) {
        const kedvencek = {
          Felhasznalo_Azon: id,
          Etel_Azon: cardDivDataId,
        };
        this.kedvenchezfuzes(kedvencek); // 'this' now correctly refers to the Controller instance
      } else {

        const Etel_Azon = cardDivDataId
        this.dataService.deleteAxiosData('http://localhost:3000/api/kedvencek', id, Etel_Azon)
      }
    });

    const kosarContainer = $('.kosar-container');

    this.kosarelem = $(".kosarbaad");
    const kosarDiv = $(".kosar");
    const rendelesosszeg = $(".rendeles-osszeg");
    const actionDiv = $('<div class="kosar-akcio"></div>');
    // If there are items in the cart, append the "Rendelés" button and total to actionDiv

    const rendelesGomb = $("<button>")
      .text("Rendelés")
      .addClass("rendeles-gomb")
      .on("click", this.veglegesites.bind(this));
    const totalAmount = this.calculateTotal();
    const totalDiv = $('<div class="kosar-osszeg">Összeg: ' + totalAmount + ' Ft</div>');
    actionDiv.append(rendelesGomb, totalDiv);

    rendelesosszeg.append(actionDiv)
    $(document).ready(function () {


      var navOriginalPos = $('nav').offset().top;
      var navHeight = $('nav').outerHeight();
      var originalPaddingMain = parseInt($('main').css('padding-top')); // Original padding of the main content

      $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();
        var mainWidth = $('main').outerWidth(); // Get the current width of the main element
        var windowWidth = $(window).width();
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
        if (scrollDistance >= navOriginalPos) {
          $('nav').addClass('fixed');
          $('nav').css({
            width: mainWidth + 'px', // Set the width of the navbar to match the main element
            left: (windowWidth - mainWidth) / 2 + 'px' // Center the navbar
          });
          $('body').css('padding-top', navHeight + 'px'); // This is to prevent the jump
        } else {
          $('nav').removeClass('fixed');
          $('nav').removeClass('fixed').css({
            width: '', // Reset the width
            left: '' // Reset the left position
          });
          $('body').css('padding-top', '0px'); // Remove the padding when navbar is not fixed
        }

        // Adjust main padding to account for fixed nav height
        if ($('nav').hasClass('fixed')) {
          $('main').css('padding-top', originalPaddingMain + navHeight + 'px');
        } else {
          $('main').css('padding-top', originalPaddingMain + 'px');
        }
      });
      $(window).on('scroll', function () {
        var scrollPosition = $(this).scrollTop();
        var newActiveId = null; // Ide tároljuk az új aktív szekció ID-ját, ha találunk

        $('.tarolo h2').each(function () {
          const sectionTop = $(this).offset().top - navHeight;
          const sectionBottom = sectionTop + $(this).outerHeight();

          if (scrollPosition >= sectionTop - 300 && scrollPosition < sectionBottom) {
            newActiveId = $(this).attr('id'); // Megjelöljük az új aktív szekciót
            return false; // Kilépünk az each ciklusból, mivel találtunk egy aktív szekciót
          }
        });

        // Ha találtunk új aktív szekciót, frissítjük az aktív class-t
        if (newActiveId !== null) {
          $('.etelkategoriak li.active').removeClass('active');
          $(`.etelkategoriak li[data-target="${newActiveId}"]`).addClass('active');
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
  kedvenchezfuzes(kedvencek) {
    this.dataService.postData(
      "http://localhost:3000/api/kedvencek",
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

    const rendelesGomb = $("<button>")
      .text("Rendelés")
      .addClass("rendeles-gomb")
      .on("click", this.veglegesites.bind(this));
    const totalAmount = this.calculateTotal();
    const totalDiv = $('<div class="kosar-osszeg">Összeg: ' + totalAmount + ' Ft</div>');
    actionDiv.append(rendelesGomb, totalDiv);

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
  megjeleniteskategoria(list, kedvenc) {
    const ul = $('.etelkategoriak');
    list.forEach(Kategoria => {
      const li = $(`<li data-target=${Kategoria.Kategoria}></li>`).text(Kategoria.Kategoria);
      ul.prepend(li);

    });
    if (Object.keys(this.kedvencekNevei).length > 0) {
      const li = $(`<li data-target=${"Kedvencek"}></li>`).text("⭐ Kedvencek");
      ul.prepend(li);
    }
    const self = this;

    // Smooth scrolling to section on nav item click, which you might already have set up
    $('.etelkategoriak li').on('click', function () {
      const targetId = $(this).data('target');
      const targetSection = $('#' + targetId);
      if (targetSection.length) {
        $('html, body').animate({
          scrollTop: targetSection.offset().top
        }, 100); // Adjust the duration as needed
      }
    });
  }


  hibakezeles(uzenet) {
    console.log(uzenet);
  }
  veglegesites() {
    this.jelenitseMegAModalt();

  }
  jelenitseMegAModalt() {
    const kosarModal = $('#kosarModal');
    kosarModal.find('.modal-body').html(this.kosarTartalmatListaz()); // Itt hozzuk létre a kosár tartalmát megjelenítő HTML-t
    kosarModal.modal('show'); // Bootstrap modális függvény, ami megjeleníti a modált
  }
  kosarTartalmatListaz() {
    let htmlContent = '<ul class="list-unstyled">';
    let osszeg = 0;
    Object.entries(this.kosarTartalom).forEach(([termekNeve, adatok]) => {
      
      osszeg += adatok.ar
      htmlContent += `
        <li>
          <strong>${termekNeve}</strong>: ${adatok.darab} db,
          Összesen: ${adatok.ar * adatok.darab} Ft
        </li>
        <br>
      `;
    });
    htmlContent += '</ul>';
    $(document).on('click', '#order-button', () => {
      // Itt az arrow functionnek köszönhetően a `this` a Controller példányára fog mutatni
      console.log('A megrendelés gombra kattintottak.');
  
      const userId = localStorage.getItem('userid');
      const totalKosarOsszeg = this.calculateTotal();
      const szallitas = {
          Megrendelő_id: userId,
          Futár_id: 2,
          Szállítás_költség: totalKosarOsszeg,
      };
      this.szallitasHozzaadas(szallitas); // a `this` itt a Controller példányára utal
  });
    return htmlContent;
    
  }
  szallitasHozzaadas(etelData) {
    this.dataService.postData(
      "http://localhost:3000/api/szallitas/add",
      etelData,
      (response) => {
        console.log("Étel hozzáadva:", response);
      },
      (error) => {
        console.error("Hiba az étel hozzáadásakor:", error);
      }
    )
    ;
    this.lekerMaxRendelesAzon();
  }
  megrendeltHozzaadas(megrendeltData) {
    this.dataService.addMegrendeltItem(
      "http://localhost:3000/api/megrendeltek",
      megrendeltData,
      (response) => {
        console.log("Megrendelt hozzáadva:", response);
      },
      (error) => {
        console.error("Hiba a megrendelt hozzáadásakor:", error);
      }
    );
    window.location.href = 'Rendeles.html'
  }
  lekerMaxRendelesAzon() {
    this.dataService.getMaxRendelesAzon(
      "http://localhost:3000/api/szallitas/maxazon",
      (data) => {

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


