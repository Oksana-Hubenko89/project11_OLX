import { login, registration, getUser } from './API-login-and-registration';
import { loadKey, saveKey, deleteKey } from './local-storage';

const debounce = require('lodash.debounce');

const refs = {
	modalLogAndReg: document.querySelector("[data-modal-log-and-reg]"),
	btnModalLogAndReg: document.querySelector(".btn-log-and-reg"),
	bodyEl: document.querySelector("body"),
};

const notifications = {
	emailEmpty: "Необходимо ввести логин",
	passwordEmpty: "Необходимо ввести пароль",
	wrongEmail: "Не правильный логин",
	wrongLoginOrPassword: "Не правильный логин или пароль",
	loginAlreadyExist: "Пользователь с таким логином уже зарегистрирован",
	passwordShort: "Минимальная длина пароля - 8 символов",
	passwordLong: "Максимальная длина пароля - 16 символов",
	passwordWithoutDigits: "Пароль должен содержать цифры",
	passwordMustContainSmallAndBigLetters: "Пароль должен содержать большие и малые буквы",
	passwordWithSpaces: "Пароль не должен содержать пробелов"
}

const emailInputEl = refs.modalLogAndReg.querySelector('.email-input');
const passwordInputEl = refs.modalLogAndReg.querySelector(".password-input");
const btnGoogleAutorisation = refs.modalLogAndReg.querySelector(".btn-google-autorisation");
const btnLogin = refs.modalLogAndReg.querySelector(".btn-login");
const btnRegistration = refs.modalLogAndReg.querySelector(".btn-registration");
const btnCloseModal = refs.modalLogAndReg.querySelector(".close-button");
const notificationErrorEmailEl = refs.modalLogAndReg.querySelector(".notification-error-email");
const notificationErrorPasswordEl = refs.modalLogAndReg.querySelector(".notification-error-password");

refs.modalLogAndReg.addEventListener('click', onBackdrop);
refs.bodyEl.addEventListener('keydown', onPressEsc);
refs.btnModalLogAndReg.addEventListener('click', onBtnLogAndRegModal);
btnGoogleAutorisation.addEventListener('click', onBtnGoogleAutorisation);
btnRegistration.addEventListener('click', onBtnRegistration);
btnLogin.addEventListener('click', onBtnLogin);
btnCloseModal.addEventListener('click', onBtnLogAndRegModal);
emailInputEl.addEventListener('input', () => onInputValue());
passwordInputEl.addEventListener('input', () => onInputValue());

function onBackdrop(event) {
	if (event.target === refs.modalLogAndReg) {
		toggleModal(refs.modalLogAndReg);
	}
}

function onPressEsc(event) {
	if (event.keyCode === 27 && !refs.modalLogAndReg.classList.contains('visually-hidden')) {
		toggleModal(refs.modalLogAndReg);
	}
}

function onBtnLogAndRegModal() {
	toggleModal(refs.modalLogAndReg);
}

//Проверка проходила-ли авторизация Google или это новое открытое окно
if (loadKey('googleAutorusation') === true) {
	const str = location.search.substr(1).split('&');
	const accessToken = str[0].slice(str[0].indexOf('=') + 1);
	const refreshToken = str[1].slice(str[1].indexOf('=') + 1);
	const id = str[2].slice(str[2].indexOf('=') + 1);

	saveKey('accessToken', accessToken);
	saveKey('refreshToken', refreshToken);
	saveKey('id', id);

	getUser(accessToken);
	deleteKey('googleAutorusation');
}

function onBtnGoogleAutorisation() {
	saveKey('googleAutorusation', true);
}

function onBtnRegistration(event) {
	event.preventDefault();

	if (!validationEmail(emailInputEl.value)) {
		errorEmail(notifications.wrongEmail);
		return;
	}

	if (!validationPassword(passwordInputEl.value)) {
		return;
	}

	if (!onRegistration(emailInputEl.value, passwordInputEl.value)) {
		return;
	}	

	if (!onLogin(emailInputEl.value, passwordInputEl.value)) {
		return;
	}

	toggleModal(refs.modalLogAndReg);
}

async function onRegistration(email, password) {
	await registration(email, password)
		.then(({ id }) => {
			saveKey('id', id);
			return true;
		})
		.catch(error => {
			if (error.response.status === 409) {
				errorEmail(notifications.loginAlreadyExist);
				// console.log("Пользователь с таким логином уже зарегистрирован");
			}
			else {
				console.log(`error = ${error.response.status}`);
			}
			return false;
		});
}

function onBtnLogin(event) {
	event.preventDefault();
	console.log("login");

	if (emailInputEl.value.length == 0) {
		errorEmail(notifications.emailEmpty);
		return;
	}

	if (passwordInputEl.value.length == 0) {
		errorPassword(notifications.passwordEmpty);
		return;
	}

	console.log("login1");

	if (!onLogin(emailInputEl.value, passwordInputEl.value)) {
		return;
	}
	console.log("login2");

	toggleModal(refs.modalLogAndReg);
}

async function onLogin(email, password) {
	await login(email, password)
		.then(({accessToken, refreshToken, sid}) => {
			saveKey('accessToken', accessToken);
			saveKey('refreshToken', refreshToken);
			saveKey('id', sid);
			console.log("login3");
			return true;
		})
		.catch(error => {
			if (error.response.status === 403) {
				errorEmail(notifications.wrongLoginOrPassword)
				// console.log("Не правильный логин или пароль");
			}
			console.log(error);
			return false;
		})
}

const onInputValue = debounce(() => {
	notificationErrorEmailEl.classList.add("visually-hidden");
	notificationErrorPasswordEl.classList.add("visually-hidden");
}, 1000);

function toggleModal(modal) {
	clearInputData();
	modal.classList.toggle('visually-hidden');
}

function validationEmail(email) {
	const PATTERN_VALIDATION_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
		errorPassword(notifications.passwordShort);
		// console.log("Минимальная длина пароля - 8 символов");
		return false;
	}
	if (password.length > MAX_LENGTH) {
		errorPassword(notifications.passwordLong);
		// console.log("Максимальная длина пароля - 16 символов");
		return false;
	}
	if (!PRESENT_DIGIT.test(password)) {
		errorPassword(notifications.passwordWithoutDigits);
		// console.log("Пароль должен содержать цифры");
		return false;
	}
	if (!PRESENT_BIG_LETER.test(password) || !PRESENT_SMALL_LETER.test(password)) {
		errorPassword(notifications.passwordMustContainSmallAndBigLetters);
		// console.log("Пароль должен содержать большие и малые буквы");
		return false;
	}
	if (!NO_SPACES.test(password)) {
		errorPassword(notifications.passwordWithSpaces);
		// console.log("Пароль не должен содержать пробелов");
		return false;
	}
	
	return true;
}

function errorEmail(notification) {
	notificationErrorEmailEl.textContent = notification;
	notificationErrorEmailEl.classList.remove("visually-hidden");
}

function errorPassword(notification) {
	notificationErrorPasswordEl.textContent = notification;
	notificationErrorPasswordEl.classList.remove("visually-hidden");
}

function clearInputData() {
	emailInputEl.value = "";
	passwordInputEl.value = "";
}


