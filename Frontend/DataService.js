class DataService {
    constructor() {}

    getAxiosData(url, callback, hibacallback){
        axios.get(url)
        .then(function (response) {
          console.log("adatok",response.data);
          console.log("státusz",response.status);
          console.log("Státusz szöveg",response.statusText);
          callback(response.data)
          
        })
        .catch(function (error) {
          hibacallback(error)
        })
        .finally(function () {
          // always executed
        });
    }
}
export default DataService