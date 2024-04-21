import DataService from "../../../Felhasznalo/DataService.js";
import Megjelenit from "../../../Felhasznalo/ÉtlapMegjelenít.js";
class Controller {
    constructor() {
        this.dataService = new DataService();

        this.dataService.getAxiosData(
            "http://localhost:3000/api/kategoria",
            (list) => this.megjeleniteskategoria(list),
            this.hibakezeles,
        );
        this.dataService.getAxiosData(
            "http://localhost:3000/api/etelek",
            (response) => this.megjelenites(response),
            this.hibakezeles,
        );
        $(document).on('click', '.star', (event) => { // Changed to arrow function
            $('#bejelentkezesModal').modal('show');
        });
        const kosarContainer = $('.kosar-container');

        this.kosarelem = $(".kosarbaad");
        const rendelesosszeg = $(".rendeles-osszeg");
        const actionDiv = $('<div class="kosar-akcio"></div>');
        const rendelesGomb = $("<button>")
            .text("Rendelés")
            .addClass("rendeles-gomb")
        const totalDiv = $('<div class="kosar-osszeg">Összeg: ' + 0 + ' Ft</div>');
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
            $('#bejelentkezesModal').modal('show');
        });
        $(document).on("click", ".rendeles-gomb", (event) => {
            event.preventDefault();
            $('#bejelentkezesModal').modal('show');
        });
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



}

export default Controller;