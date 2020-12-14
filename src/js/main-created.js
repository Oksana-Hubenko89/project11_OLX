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
};

refs.logoEL.addEventListener('click', getCard);

function getLeft(id, position, arg) {
  return function (e) {
    const listCardEL = document.querySelector(`#${id} .card-field`);
    const CardEL = document.querySelector(`#${id} .card-item`);
    console.log('left');
    console.log(CardEL.offsetWidth);
    position.left = position.left + arg * (CardEL.offsetWidth + 25);
    if (position.left === -listCardEL.offsetWidth) {
      e.preventDefault();
    }
    listCardEL.style.left = position.left + 'px';
  };
}

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
      const btnRightEL = document.querySelector(`#${key} .swipe-right`);
      const position = { left: 0 };
      btnLeftEL.addEventListener('click', getLeft(key, position, -1));
      btnRightEL.addEventListener('click', getLeft(key, position, +1));
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
