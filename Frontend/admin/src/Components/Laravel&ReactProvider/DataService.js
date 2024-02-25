import axios from "axios";

class DataService {
  constructor() {
    this.getAxiosData = this.getAxiosData.bind(this);
    this.postAxiosData = this.postAxiosData.bind(this);
    this.deleteAxiosData = this.deleteAxiosData.bind(this);
    this.putAxiosData = this.putAxiosData.bind(this);
  }

  getAxiosData(url, callback, errorCallback) {
    axios.get(url)
      .then(response => callback(response.data))
      .catch(error => errorCallback(error))
      .finally(() => {/* always executed */});
  }

  postAxiosData(url, data) {
    axios.post(url, data)
      .then(response => console.log(response))
      .catch(error => {
        console.error("Hibaüzenet:", error.message);
        if (error.response) {
          console.error("Státuszkód:", error.response.status);
          console.error("Válasz szövege:", error.response.statusText);
          console.error("Válasz adat:", error.response.data);
        }
      });
  }

  deleteAxiosData(url, id) {
    axios.delete(`${url}/${id}`)
      .then(response => console.log("RESP", response))
      .catch(error => console.error("hiba", error));
  }

  putAxiosData(url, data) {
    console.log(data);
    console.log(`${url}`);
    return new Promise((resolve, reject) => {
      axios.put(`${url}`, data)
        .then(response => {
          console.log("RESP", response);
          resolve(response);
        })
        .catch(error => {
          console.error("hiba", error);
          reject(error);
        });
    });
  }
}

export default DataService;
