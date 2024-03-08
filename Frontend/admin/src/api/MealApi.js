import axios from 'axios';

const httpClient = axios.create({
	baseURL: 'http://localhost:8000/api'
});

const getMeals = () => httpClient.get('/eteleink');
const deleteMeal = (id) => httpClient.delete(`/eteleink/${id}`);

const getWorkers = () => httpClient.get('/Dolgozok');

export const useMealApi = () => ({
	getMeals,
	deleteMeal,
	getWorkers
});
