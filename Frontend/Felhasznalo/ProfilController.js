import DataService from "./DataService.js";

class Controller {
    constructor() {
        const userId = localStorage.getItem('userid');
        this.dataService = new DataService();
        $(document).ready(() => {

                this.fetchOrderedFoods(userId);

        });
        const id = localStorage.getItem("userid")
        
    }
    fetchOrderedFoods(userId) {
        this.dataService.getAxiosData(
            `http://localhost:3000/api/ordered-foods/${userId}`,
            (response) => {
                console.log(response);
                this.displayOrderedFoods(response);
            },
            (error) => {
                console.error('An error occurred:', error);
            }
        );
    }
    displayOrderedFoods(data) {
        const orderedFoodsContainer = $('#ordered-foods-container');
        orderedFoodsContainer.empty();
    
        if (data && data.length > 0) {
            const list = $('<ul>');
            data.forEach((delivery, index) => {
                const listItem = $(`<li>${delivery.Szallitas_Vege}</li>`);

                if (index === 0) {
                    listItem.addClass('elso');
                }
                listItem.on('click', () => this.showModal(delivery));
                list.append(listItem);
            });
            orderedFoodsContainer.append(list);
        } else {
            orderedFoodsContainer.text('Nincs megjeleníthető rendelés.');
        }
    }

    showModal(delivery) {

        $('#modal-order-id').text(`Rendelés Azonosítója: ${delivery.Rendeles_Azon}`);
        $('#modal-delivery-date').text(`Kiszállítás Dátuma: ${delivery.Szallitas_Vege}`);

        const modalItems = $('#modal-items');
        modalItems.empty();
    
        delivery.Etelek.forEach(item => {
            modalItems.append($(`<p>${item.Elnevezes}, Mennyiség: ${item.Mennyiseg}</p>`));
        });
    

        $('#orderModal').show();
    }
};

export default Controller;