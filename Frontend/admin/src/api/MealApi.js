import axios from 'axios';

const httpClient = axios.create({
	baseURL: 'http://localhost:3000/api'
});

const getMeals = () => httpClient.get('/eteleink');
const deleteMeal = (id) => httpClient.delete(`/eteleink/${id}`);

const getWorkers = () => httpClient.get('/Workers');

export const useMealApi = () => ({
	getMeals,
	deleteMeal,
	getWorkers
});
