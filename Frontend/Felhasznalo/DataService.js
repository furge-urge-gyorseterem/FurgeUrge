class DataService {
  constructor() {}

  getAxiosData(url, callback, hibacallback) {
    axios
      .get(url)
      .then(function (response) {
        console.log("adatok", response.data);
        console.log("státusz", response.status);
        console.log("Státusz szöveg", response.statusText);
        callback(response.data);
      })
      .catch(function (error) {
        hibacallback(error);
      })
      .finally(function () {
        // always executed
      });
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
  
}
export default DataService;