// Элементы DOM-дерева
const mainRenderPageEl = document.querySelector('body');
// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'call/favourite/';
const key = localStorage.getItem('accessToken');
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${key}`,
  },
};
// Вызов функции добавления товара в Избранное
mainRenderPageEl.addEventListener('click', onClick);

// Функция добавления карточки товара на API-сервер
function addFavorite(URL, keyPart, id, options) {
  return fetch(`${URL}${keyPart}${id}`, options)
    .then(response => response.json())
    .then(post => alert('This product is already in favorites'))
    .catch(error => alert('This product is already in favorites'));
}
// Функция добавления карточки товара в избранное по клику на сердечко
function onClick(evt) {
  if (evt.target.hasAttribute('data-favorite-button')) {
    const id = evt.target.closest('[data-item]').getAttribute('id');
    addFavorite(URL, keyPart, id, options);
  }
}
