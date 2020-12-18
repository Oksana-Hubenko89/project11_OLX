const axios = require('axios').default;

const BASE_URL = "https://callboard-backend.herokuapp.com";

export function getUser(accessToken) {
	// axios(`${BASE_URL}/user`, { 'accessToken': `${accessToken}`, 'refreshToken': `${refreshToken}`, 'sid': `${id}` })
	return axios(`${BASE_URL}/user`, { headers: { Authorization: `${accessToken}` } })
		.then(res => res)
		.catch(error => {
			console.log(error);
		})	
}

export function login(email, password) {	
	return axios.post(`${BASE_URL}/auth/login`, {
			"email": `${email}`,
			"password": `${password}`
		})
		.then(({ data }) => data)
}

export function registration(email, password) {
	return axios.post(`${BASE_URL}/auth/register`, {
		"email": `${email}`,
		"password": `${password}`
	})
		.then(data => data)
}

export function logout(accessToken) {
	return axios.post(`${BASE_URL}/auth/logout`, { headers: { Authorization: `${accessToken}` } })
		.then(data => data)
}

export default {login, registration, getUser, logout};