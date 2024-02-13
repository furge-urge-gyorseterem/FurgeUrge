import DataService from './DataService.js';
import Megjelenit from './ÉtlapMegjelenít.js';
class Controller{
    constructor(){

        this.dataService = new DataService();
        this.dataService.getAxiosData("http://localhost:8000/api/eteleink", this.megjelenites, this.hibakezeles);

    }
    megjelenites(list){
        const szuloElem = $(".tarolo");
        const megjelenito = new Megjelenit(list, szuloElem);
    }
    hibakezeles(uzenet){
        console.log(uzenet)
    }
}
export default Controller
