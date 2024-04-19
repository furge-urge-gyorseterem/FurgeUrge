class DataService {
  constructor() {}

  getAxiosData(url, callback, hibacallback) {
    axios
      .get(url)
      .then(function (response) {

        callback(response.data);
      })
      .catch(function (error) {
        hibacallback(error);
      })
      .finally(function () {
        // always executed
      });
  }
  getTokenAxiosData(url, token){
    axios
    .get(`${url}/${token}`)
    .then((response)=> {
      console.log("RESP", response);
  })
    .catch((error)=> {
      console.log("hiba",error);
    })
  }
  
  postData(url, data, callback, errorCallback) {
    axios
      .post(url, data)
      .then((response) => callback(response.data))
      .catch((error) => errorCallback(error))
      .finally(() => {
        // Mindig végrehajtódik
      });
  }
  getMaxRendelesAzon(url, callback, errorCallback) {
    axios
      .get(url)
      .then((response) => {
        console.log("Legmagasabb rendelés azonosító:", response.data);
        callback(response.data);
      })
      .catch((error) => {
        console.error(
          "Hiba a legmagasabb rendelés azonosító lekérésekor:",
          error
        );
        errorCallback(error);
      })
      .finally(() => {
        // Mindig végrehajtódik
      });
  }
  addMegrendeltItem(url, megrendeltData, callback, errorCallback) {
    this.postData(url, megrendeltData, callback, errorCallback);
  }
  deleteAxiosData(url, Azon, id){
    axios
    .delete(`${url}/${Azon}/${id}`)
    .then((response)=> {
      console.log("RESP", response);
  })
    .catch((error)=> {
      console.log("hiba",error);
    })
  }
  
}
export default DataService;
