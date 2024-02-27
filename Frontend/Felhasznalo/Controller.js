import DataService from './DataService.js';
import Megjelenit from './ÉtlapMegjelenít.js';

class Controller {
    constructor() {
        

        this.dataService = new DataService();
        this.dataService.getAxiosData("http://localhost:8000/api/eteleink", this.megjelenites.bind(this), this.hibakezeles);

    }

    megjelenites(list) {
        const szuloElem = $(".tarolo");
        // Pass an additional parameter: a callback for handling button clicks
        const megjelenito = new Megjelenit(list, szuloElem, this.handleOrderButtonClick.bind(this));
        this.handleOrderButtonClick();
    }

    hibakezeles(uzenet) {
        console.log(uzenet);
    }

    // Method to be called when an order button is clicked
    handleOrderButtonClick() {
        // Define the URL and data for the POST request
        const url = "http://localhost:8000/api/order/create";
        const data = { etel: "ASD leves", mennyiseg: 1 }; // Example data, adjust as needed

        this.dataService.postData(url, data, (response) => {
            console.log("Order created successfully", response);
            // Additional success handling
        }, (error) => {
            console.error("Error creating order", error);
            // Additional error handling
        });
        const data2 = { etel: "Szalámis Pizza", mennyiseg: 3 }
        this.dataService.postData(url, data2, (response) => {
            console.log("Order created successfully", response);
            // Additional success handling
        }, (error) => {
            console.error("Error creating order", error);
            // Additional error handling
        });
    }
}
export default Controller;
