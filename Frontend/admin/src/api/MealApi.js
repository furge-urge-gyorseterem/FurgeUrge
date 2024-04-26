import axios from 'axios';

const httpClient = axios.create({
	baseURL: 'http://localhost:3000/api'
});

const getMeals = () => httpClient.get('/eteleink');
const deleteMeal = (id) => httpClient.delete(`/eteleink/${id}`);

const getWorkers = () => httpClient.get('/Workers');
const getuser = (id) => httpClient.get(`/user/${id}`);

const getAdminAdat = () => httpClient.get('/AAdat');
const getAdminSzAdat=()=> httpClient.get('/SzAdat');
const getrendop = () => httpClient.get('/rendstats');
const statuszmodosit = (rendelestId, ujStatusz) => httpClient.patch(`/RendelesstatuszModosit/${rendelestId}/${ujStatusz}`);

const valtoztat = (id, mealData) => httpClient.patch(`/Epatch/${id}`, mealData);
const newfood = (mealData) => httpClient.post(`/Epost`, mealData);


export const useMealApi = () => ({
	getuser,
	getMeals,
	deleteMeal,
	getWorkers,
	getAdminAdat,
	getrendop,
	statuszmodosit,
	valtoztat,
	newfood,
	getAdminSzAdat
});
