const Handlebars = require('handlebars');

import sectionTpl from '../templates/section.hbs';

const templateNames = {
  businessAndServices: 'Бізнес та послуги',
  electronics: 'Електроніка',
  free: 'Віддам безкоштовно',
  sales: 'Розпродаж',
  propetry: 'Нерухомість',
  recreationAndSport: 'Відпочинок і спорт',
  trade: 'Обмін',
  transport: 'Транспорт',
  work: 'Робота',
};

const refs = {
  logoEL: document.querySelector('.js-logo-open'),
  btnClearEL: document.querySelector('.js-btclean-filter'),
  mainContainerEL: document.querySelector('.js-render-main-page'),
  headerMenuEL: document.querySelector('.header-menu'),
  paginatorPagesEL: document.querySelector('.pagination-conteiner'),
  // itemMenuEL: document.querySelectorAll('.site-nav-item'),
};
console.log(refs.headerMenuEL);

refs.headerMenuEL.addEventListener('click', createCategoryMenu);

function createCategoryMenu(e) {
  e.preventDefault();
  const keyCategory = e.target.dataset.id;
  console.log(keyCategory);
  getCard();
  showAll(keyCategory);
}

const API = 'https://callboard-backend.herokuapp.com/call?page=';
let page = 1;

refs.logoEL.addEventListener('click', getCard);
refs.btnClearEL.addEventListener('click', getCard);
refs.paginatorPagesEL.addEventListener('click', chengPages);

async function postData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return await response.json();
}

function chengPages(e) {
  e.preventDefault();
  page = e.target.dataset.id;
  console.log(page);
  getCard();
}

function getLeft(id, position, arg) {
  return function (e) {
    e.preventDefault();
    const listCardEL = document.querySelector(`#${id} .card-field`);
    const CardEL = document.querySelector(`#${id} .card-item`);
    position.left = position.left + arg * (CardEL.offsetWidth + 25);
    if (position.left === -listCardEL.offsetWidth || position.left === listCardEL.offsetWidth) {
      e.preventDefault();
    }
    listCardEL.style.left = position.left + 'px';
  };
}

function getCard(e) {
  console.log('Клик был, функция запущена');

  e.preventDefault();
  clearArticlesContainer();

  postData(API + page).then(data => {
    console.log(data);
    Object.keys(data).forEach(key => {
      createCategoryMarkup(data[key], key);
      const btnLeftEL = document.querySelector(`#${key} .swipe-left`);
      const btnRightEL = document.querySelector(`#${key} .swipe-right`);
      const showAllEL = document.querySelector(`#${key} .show-all`);
      const position = { left: 0 };
      btnLeftEL.addEventListener('click', getLeft(key, position, +1));
      btnRightEL.addEventListener('click', getLeft(key, position, -1));
      showAllEL.addEventListener('click', showAll(key));
    });
  });
}

function showAll(id) {
  return function () {
    const listCardEL = document.querySelector(`#${id} .card-field`);
    const headerCategoridEL = document.querySelector(`#${id} .header-categori`);
    const CategoridEL = document.querySelectorAll(`.section`);
    listCardEL.classList.replace('card-field', 'card-field-wrap');
    headerCategoridEL.classList.add('visually-hidden');
    for (let i = 0; i < CategoridEL.length; i += 1) {
      if (CategoridEL[i].id != id) {
        CategoridEL[i].classList.add('visually-hidden');
      }
    }
  };
}

function createCategoryMarkup(arg, key) {
  if (arg.length === 0) {
    return;
  }
  refs.mainContainerEL.insertAdjacentHTML(
    'beforeend',
    sectionTpl({ data: arg, name: templateNames[key], id: key }),
  );
}

function clearArticlesContainer() {
  refs.mainContainerEL.innerHTML = '';
}
