const axios = require('axios').default;
const BASE_URL = "https://callboard-backend.herokuapp.com";

const refs = {
	modalLogAndReg: document.querySelector(".modal-log-and-reg"),
	btnModalLogAndReg: document.querySelector(".btn-log-and-reg"),
	modalLogAndReg: document.querySelector(".modal-log-and-reg"),
};

const emailInputEl = refs.modalLogAndReg.querySelector('.email-input');
const passwordInputEl = refs.modalLogAndReg.querySelector(".password-input");
const btnLogin = refs.modalLogAndReg.querySelector(".btn-login");
const btnRegistration = refs.modalLogAndReg.querySelector(".btn-registration");
const btnCloseModal = refs.modalLogAndReg.querySelector(".close-button");

refs.btnModalLogAndReg.addEventListener('click', onBtnLogAndRegModal);
btnRegistration.addEventListener('click', onBtnRegistration);
btnLogin.addEventListener('click', onBtnLogin);
btnCloseModal.addEventListener('click', onBtnLogAndRegModal);

function onBtnLogAndRegModal() {
	console.log("close");
	toggleModal(refs.modalLogAndReg);
}

function onBtnRegistration(event) {
	event.preventDefault();

	if (!validationEmail(emailInputEl.value)) {
		console.log("Не правильный email");
		return;
	}

	if (!validationPassword(passwordInputEl.value)) {
		console.log("Не правильный пароль");
		return;
	}

	registration(emailInputEl.value, passwordInputEl.value);
}

function onBtnLogin(event) {
	event.preventDefault();

	if (emailInputEl.value.length == 0) {
		console.log("Необходимо ввести логин");
		return;
	}

	if (passwordInputEl.value.length == 0) {
		console.log("Необходимо ввести пароль");
		return;
	}

	login(emailInputEl.value, passwordInputEl.value);
}

function toggleModal(modal) {
	modal.parentNode.classList.toggle('visually-hidden');
}

// function closeModalWindow(event) {
// 	event.preventDefault();

// 	const modal = event.target;
// }

function login(email, password) {	
	axios.post(`${BASE_URL}/auth/login`, {
		"email": `${email}`,
		"password": `${password}`
	})
		.then(({ data }) => {
			console.log(data);
			localStorage.setItem('accessToken', `${data.accessToken}`);
			localStorage.setItem('refreshToken', `${data.refreshToken}`);
			localStorage.setItem('id', `${data.sid}`);
		})
		.catch(error => {
			if (error.response.status === 403) {
				console.log("Не правильный логин или пароль");
			}
			console.log(error);
		})	
}

function registration(email, password) {
	axios.post(`${BASE_URL}/auth/register`, {
		"email": `${email}`,
		"password": `${password}`
	})
		.then(({data}) => {
			localStorage.setItem('id', `${data.id}`);
			login(email, password);
		})
		.catch(error => {
			if (error.response.status === 409) {
				console.log("Пользователь с таким логином уже зарегистрирован");
			}
			else {
				console.log(`error = ${error.response.status}`);
			}
		});
}

function validationEmail(email) {
	PATTERN_VALIDATION_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return PATTERN_VALIDATION_EMAIL.test(email);
}

function validationPassword(password) {
	const MIN_LENGTH = 8;
	const MAX_LENGTH = 16;
	const PRESENT_DIGIT = /\d/;
	const PRESENT_BIG_LETER = /[A-Z]/;
	const PRESENT_SMALL_LETER = /[a-z]/;
	const NO_SPACES = /\S/;

	if (password.length < MIN_LENGTH) {
		console.log("Минимальная длина пароля - 8 символов");
		return false;
	}
	if (password.length > MAX_LENGTH) {
		console.log("Максимальная длина пароля - 16 символов");
		return false;
	}
	if (!PRESENT_DIGIT.test(password)) {
		console.log("Пароль должен содержать цифры");
		return false;
	}
	if (!PRESENT_BIG_LETER.test(password) || !PRESENT_SMALL_LETER.test(password)) {
		console.log("Пароль должен содержать большие и малые буквы");
		return false;
	}
	if (!NO_SPACES.test(password)) {
		console.log("Пароль не должен содержать пробелов");
		return false;
	}
	
	return true;
}