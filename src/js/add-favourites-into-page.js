import parsFavoritesList from '../templates/favourites-section.hbs';

// Элементы DOM-дерева
const favoriteSectionEl = document.querySelector('#favorite-section');
const addBackdropEl = favoriteSectionEl.querySelector('#add-backdrop');
const closeButtonEl = favoriteSectionEl.querySelector('#close-section-button');
const fevoritesListEl = favoriteSectionEl.querySelector('#favourites-list');
const showFavoriteButtonEl = document.querySelector('#show-favorites-button');
// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'call/favourites';
const key = localStorage.getItem('accessToken');
const options = {
  headers: {
    Authorization: `${key}`,
  },
};
// Вызов функции рендера страницы по кнопке
showFavoriteButtonEl.addEventListener('click', e => {
  e.preventDefault();
  removeOldTegs(fevoritesListEl);
  toggleModal(addBackdropEl, false);
  getFavoritesList(URL, keyPart, options);
});
// Вызов функции закрытия модалки по кнопке

closeButtonEl.addEventListener('click', () => {
  toggleModal(addBackdropEl, true);
});

// Функция вызова карточек товара для Обраного
function getFavoritesList(URL, keyPart, options) {
  return fetch(`${URL}${keyPart}`, options)
    .then(response => response.json())
    .then(response => putPicturesIntoHTML(fevoritesListEl, parsFavoritesList, response));
}
//  Функция добавления списка картинок в HTML
function putPicturesIntoHTML(el, templateFunction, r) {
  el.insertAdjacentHTML('beforeend', templateFunction(r.favourites));
}
// Функция закрытия модалки
function toggleModal(el, bool) {
  el.classList.toggle('visually-hidden', bool);
}
// Функция удаления зарендерых ранее элементов
function removeOldTegs(parentElement) {
  parentElement.innerHTML = '';
}
