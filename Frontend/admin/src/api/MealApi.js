import axios from 'axios';

const httpClient = axios.create({
	baseURL: 'http://localhost:3000/api'
});

const getMeals = () => httpClient.get('/eteleink');
const deleteMeal = (id) => httpClient.delete(`/eteleink/${id}`);

const getWorkers = () => httpClient.get('/Workers');
const getcostumers = () => httpClient.get('/COST');
const getuser = (id) => httpClient.get(`/user/${id}`);


const getAdminSzAdat=()=> httpClient.get('/SzAdat');
const getrendop = () => httpClient.get('/rendstats');
const statuszmodosit = (rendelestId, ujStatusz) => httpClient.patch(`/RendelesstatuszModosit/${rendelestId}/${ujStatusz}`);
const RendelésFelvétel = (rendelesAzon, futarId) => httpClient.put(`/updateFutar/${rendelesAzon}/${futarId}`);

const valtoztat = (id, mealData) => httpClient.patch(`/Epatch/${id}`, mealData);
const Uservaltoztat = (id, UData) => httpClient.patch(`/usersM/${id}`, UData);
const newfood = (mealData) => httpClient.post(`/Epost`, mealData);


export const useMealApi = () => ({
	getuser,
	getMeals,
	deleteMeal,
	getWorkers,
	
	getrendop,
	statuszmodosit,
	valtoztat,
	newfood,
	getAdminSzAdat,
	getcostumers,
	Uservaltoztat,
	RendelésFelvétel
});
