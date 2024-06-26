
import DataService from "./DataService.js";
import Megjelenit from "./ÉtlapMegjelenít.js";
class Controller {
  constructor() {
    this.kosarTartalom = {};
    this.kedvencekNevei = {};
    this.dataService = new DataService();
    console.log(localStorage)
    const id = localStorage.getItem('userid');
    const státusz = localStorage.getItem('statusz')
    const adminLi = státusz === 'Admin' ? $(`<li class="munkaF"><a href="http://localhost:3001/?id=${id}">Admin</a></li>`) : $();
    const FutárLi = státusz === 'Futár' ? $(`<li class="munkaF"><a href="http://localhost:3001/?id=${id}">Futár</a></li>`) : $();
    const DolgozóLi = státusz === 'Dolgozó' ? $(`<li class="munkaF"><a href="http://localhost:3001/?id=${id}">Dolgozó</a></li>`) : $();
    this.redirectIfUnauthenticated();
    $('.Profil a').text(localStorage.getItem('nev'))
    $('navigation ul.navigation-right').prepend(adminLi).prepend(FutárLi).prepend(DolgozóLi);
    this.dataService.getAxiosData(
      `http://localhost:3000/api/kedvencek/${id}`,
      (response) => {

        response.forEach(kedvenc => {

          this.kedvencekNevei[kedvenc.Etel_Azon] = kedvenc.etel.Elnevezes;
        });

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
    $(document).on('click', '.star', (event) => { 
      var cardDivDataId = $(event.currentTarget).closest('.card').data('id');
      const isWhite = $(event.currentTarget).css('background-color') === 'rgb(255, 255, 255)';
      $(event.currentTarget).css('background-color', isWhite ? 'yellow' : 'white');
      if (isWhite) {
        const kedvencek = {
          Felhasznalo_Azon: id,
          Etel_Azon: cardDivDataId,
        };
        this.kedvenchezfuzes(kedvencek); 
      } else {

        const Etel_Azon = cardDivDataId
        this.dataService.deleteAxiosData('http://localhost:3000/api/kedvencek', id, Etel_Azon)
      }
    });
    $(document).on('click', '.info p', function() {

      const etelAzon = $(this).closest('.card').data('id');
      const etelNev = $(this).closest('.card').find('.nev p').text();
      const etelLeiras = $(this).closest('.card').find('.leiro p').text();
    
      $('#infoModal .modal-title').text(etelNev);
      $('#infoModal #etelLeiras').text(etelLeiras);

      $('#infoModal').modal('show');
    });
    const kosarContainer = $('.kosar-container');

    this.kosarelem = $(".kosarbaad");
    const kosarDiv = $(".kosar");
    const rendelesosszeg = $(".rendeles-osszeg");
    const actionDiv = $('<div class="kosar-akcio"></div>');


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
      var originalPaddingMain = parseInt($('main').css('padding-top')); 

      $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();
        var mainWidth = $('main').outerWidth(); 
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
            width: mainWidth + 'px',
            left: (windowWidth - mainWidth) / 2 + 'px'
          });
          $('body').css('padding-top', navHeight + 'px');
        } else {
          $('nav').removeClass('fixed');
          $('nav').removeClass('fixed').css({
            width: '',
            left: ''
          });
          $('body').css('padding-top', '0px');
        }

        if ($('nav').hasClass('fixed')) {
          $('main').css('padding-top', originalPaddingMain + navHeight + 'px');
        } else {
          $('main').css('padding-top', originalPaddingMain + 'px');
        }
      });
      $(window).on('scroll', function () {
        var scrollPosition = $(this).scrollTop();
        var newActiveId = null;

        $('.tarolo h2').each(function () {
          const sectionTop = $(this).offset().top - navHeight;
          const sectionBottom = sectionTop + $(this).outerHeight();

          if (scrollPosition >= sectionTop - 300 && scrollPosition < sectionBottom) {
            newActiveId = $(this).attr('id');
            return false;
          }
        });

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
    $(document).on('click', '.close', function () {
      $('#kosarModal').modal('hide');
      $('#infoModal').modal('hide');
    });
    $(document).on('click', '#bezar', function () {
      $('#infoModal').modal('hide');
    });
    $(document).on("click", ".Kilepes", (event) => {

      event.preventDefault();
      $.ajax({
        url: 'http://localhost:3000/api/logout',
        type: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'), 
        },
        success: function (response) {
          console.log('Logout successful');
          localStorage.clear()
          window.location.href = '../Guest/index.html';
        },
        error: function (xhr, status, error) {
          console.error('Logout failed:', error);
        }
      });
    });
  }
  etelekMegjelenitesKedvencekNelkul(etelekResponse) {
    const tisztitottEtelek = etelekResponse.map(kategoria => {
      const tisztitottEtelek = kategoria.Etelek.filter(etel => {

        return !Object.values(this.kedvencekNevei).includes(etel.Elnevezes);
      });
      return {
        ...kategoria,
        Etelek: tisztitottEtelek
      };
    });

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

    const kosarUres = Object.keys(this.kosarTartalom).length === 0;
    const kosarContainer = $('.kosar-container');
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

    kosarDiv.append(
      kosarTermeknevekDiv,
      kosarArakDiv,
      kosarDarabszamokDiv,
      kosarMennyisegValtoztatoDiv
    );

    const actionDiv = $('<div class="kosar-akcio"></div>');


    const rendelesGomb = $("<button>")
      .text("Rendelés")
      .addClass("rendeles-gomb")
      .on("click", this.veglegesites.bind(this));
    const totalAmount = this.calculateTotal();
    const totalDiv = $('<div class="kosar-osszeg">Összeg: ' + totalAmount + ' Ft</div>');
    actionDiv.append(rendelesGomb, totalDiv);

    rendelesosszeg.append(actionDiv)
    const baseHeight = 220;
    const itemHeight = 22;
    const itemCount = Object.keys(this.kosarTartalom).length; 
    const newModalHeight = baseHeight + ((itemCount - 1) * itemHeight);

    $('#kosarModal .modal-content').css('height', newModalHeight + 'px');
    this.updateModalTitleWithTotal(totalAmount);
  }

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
    this.kosarUIFrissites(); 
    this.toggleKosarContainerDisplay();
  }
  updateModalTitleWithTotal(total) {
    const modalTitle = $('#kosarModal .modal-title');
    const titleText = 'Kosár Tartalma - Összesen: ' + total + ' Ft';
    modalTitle.text(titleText);
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

    $('.etelkategoriak li').on('click', function () {
      const targetId = $(this).data('target');
      const targetSection = $('#' + targetId);
      if (targetSection.length) {
        $('html, body').animate({
          scrollTop: targetSection.offset().top
        }, 100); 
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
    const totalAmount = this.calculateTotal(); 
    kosarModal.find('.modal-title').text('Kosár Tartalma - Összesen: ' + totalAmount + ' Ft');
    kosarModal.find('.modal-body').html(this.kosarTartalmatListaz());
    kosarModal.modal('show');
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
      console.log('A megrendelés gombra kattintottak.');

      const userId = localStorage.getItem('userid');
      const totalKosarOsszeg = this.calculateTotal();
      const szallitas = {
        Megrendelő_id: userId,
        Futár_id: 2,
        Szállítás_költség: totalKosarOsszeg,
      };
      this.szallitasHozzaadas(szallitas); 
      $('#kosarModal').modal('hide');
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
  megrendeltHozzaadas(megrendeltData, resolve, reject) {
    this.dataService.addMegrendeltItem(
      "http://localhost:3000/api/megrendeltek",
      megrendeltData,
      (response) => {
        console.log("Megrendelt hozzáadva:", response);
        resolve(response); 
      },
      (error) => {
        console.error("Hiba a megrendelt hozzáadásakor:", error);
        reject(error); 
      }
    );
  }
  lekerMaxRendelesAzon() {
    this.dataService.getMaxRendelesAzon(
      "http://localhost:3000/api/szallitas/maxazon",
      (data) => {
        const nextRendelesAzon = data.Rendeles_Azon + 1;
        const promises = Object.entries(this.kosarTartalom).map(([termekNeve, adatok]) => {
          const rendeles = {
            Rendeles_Azon: nextRendelesAzon,
            Etel_Azon: adatok.id,
            mennyiseg: adatok.darab,
          };
          return new Promise((resolve, reject) => {
            this.megrendeltHozzaadas(rendeles, resolve, reject);
          });
        });

        Promise.all(promises)
          .then(() => {
            window.location.href = 'Rendeles.html';
          })
          .catch(error => {
            console.error('Error processing one or more items:', error);
          });
      },
      (error) => {
        console.error("Hiba a legnagyobb Rendeles_Azon lekérésekor:", error);
      }
    );
}
  megjeleniteskedvenc(kedvencekLista) {

    const szuloElem = $(".tarolo");

    const kedvencekObj = {
      Kategoria: "Kedvencek",
      Etelek: kedvencekLista.map(kedvenc => kedvenc.etel)
    };
   
    new Megjelenit([kedvencekObj], szuloElem, true);
  }
  redirectIfUnauthenticated() {
    if (!localStorage.getItem('accessToken')) {
      window.location.href = '../Guest/index.html'; 
    }
  }
}

export default Controller;


