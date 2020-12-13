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

// section-name скрыть хедер по этому класу после нажатия дивитись всы
//  заменить класс card-field на card-field-wrap
const refs = {
  logoEL: document.querySelector('.js-logo-open'),
  mainContainerEL: document.querySelector('.js-render-main-page'),
  btnLeftEL: document.querySelector('.swipe-left'),
  btnRightEL: document.querySelector('.swipe-right'),
};
console.log(refs.logoEL);
console.log(refs.mainContainerEL);

refs.logoEL.addEventListener('click', getCard);

let left = 0;
let right = 0;

function getLeft(id) {
  return function (e) {
    const listCardEL = document.querySelector(`#${id} .card-field`);
    const CardEL = document.querySelector(`#${id} .card-item`);
    console.log('left');
    console.log(CardEL.offsetWidth);
    left = left - CardEL.offsetWidth - 25;
    if (left < -listCardEL.offsetWidth) {
      e.preventDefault();
    }
    listCardEL.style.left = left + 'px';
  };
}
function getRight() {}

const API = 'https://callboard-backend.herokuapp.com/call?page=';
let page = 1;

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

function getCard(e) {
  console.log('Клик был, функция запущена');

  e.preventDefault();
  clearArticlesContainer();

  postData(API + page).then(data => {
    console.log(data);
    Object.keys(data).forEach(key => {
      createCategoryMarkup(data[key], key);
      const btnLeftEL = document.querySelector(`#${key} .swipe-left`);
      btnLeftEL.addEventListener('click', getLeft(key));
    });

    console.log(CardEL.offsetWidth);
    console.log(listCardEL.offsetWidth);
  });
}

function createCategoryMarkup(arg, key) {
  console.log(templateNames[key]);
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
