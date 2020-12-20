import parsMyAdsList from '../templates/my-ads-section.hbs';
// логин: test@test.com Пароль: Qwerty123
// Элементы DOM-дерева
const myAdsSectionEl = document.querySelector('#my-ads-section');
const addBackdropEl = myAdsSectionEl.querySelector('#add-backdrop');
const closeButtonEl = myAdsSectionEl.querySelector('#close-my-ads-button');
const myAdsListEl = myAdsSectionEl.querySelector('#my-ads-list');
const showMyAdsButtonEl = document.querySelector('#show-my-ads-button');
// console.log(showMyAdsButtonEl);
// console.log(myAdsListEl);
// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'user';
const key = localStorage.getItem('accessToken');
const options = {
  headers: {
    Authorization: `${key}`,
  },
};

// ВЫЗОВЫ ФУКЦИЙ:
// рендер страницы по кнопке
showMyAdsButtonEl.addEventListener('click', e => {
  e.preventDefault();
  openModalWindow(addBackdropEl);
  getMyAdsList(URL, keyPart, options);
});
// закрытие модалки по кнопке
closeButtonEl.addEventListener('click', () => {
  closeModalWindow();
});
// закрытие модалки по Esc
document.addEventListener('keydown', closeModalByEsc);
// закрытие модалки по клику на бэкдроп(оверлей)
addBackdropEl.addEventListener('click', closeModalByOverlayClick);

// ОБЪЯВЛЕНИЕ ФУНКЦИЙ:
// вызов карточек товара для Мої оголошення
function getMyAdsList(URL, keyPart, options) {
  return fetch(`${URL}${keyPart}`, options)
    .then(response => response.json())
    .then(response => putPicturesIntoHTML(myAdsListEl, parsMyAdsList, response));
}
// открытие модалки
function openModalWindow(el) {
  el.classList.toggle('visually-hidden', false);
}

//  добавлениу списка картинок в HTML
function putPicturesIntoHTML(el, templateFunction, r) {
  el.insertAdjacentHTML('beforeend', templateFunction(r.calls));
}
// удаление зарендерых ранее элементов
function removeOldTegs(parentElement) {
  parentElement.innerHTML = '';
}
// закрытие модалки
function closeModalWindow() {
  removeOldTegs(myAdsListEl);
  addBackdropEl.classList.toggle('visually-hidden', true);
}
// закрытие модалки по кнопке Esc
function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModalWindow();
  }
}
// закрытие модалки по оверлею
function closeModalByOverlayClick(evt) {
  if (evt.target.classList.contains('add-backdrop')) {
    closeModalWindow();
  } else {
    return;
  }
}
