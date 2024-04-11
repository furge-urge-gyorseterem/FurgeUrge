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
            data.forEach(delivery => {
                const deliveryDiv = $('<div class="delivery"></div>');
                deliveryDiv.append(`<h3>Rendelés Azonosító: ${delivery.Rendeles_Azon}</h3>`);
    
                const foodList = $('<ul>');
                delivery.Etelek.forEach(item => {
                    foodList.append($('<li>').text(`${item.Elnevezes}, Mennyiség: ${item.Mennyiseg}`));
                });
                deliveryDiv.append(foodList);
    
                orderedFoodsContainer.append(deliveryDiv);
            });
        } else {
            orderedFoodsContainer.text('Nincs megjeleníthető rendelés.');
        }
    }
    
};

export default Controller;