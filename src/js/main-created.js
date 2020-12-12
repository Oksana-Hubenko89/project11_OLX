import selesTpl from '../templates/sales-section.hbs';
import propertyTpl from '../templates/propetry-section.hbs';
import transportTpl from '../templates/transport-section.hbs';
import workTpl from '../templates/work-section.hbs';
import electronicsTpl from '../templates/electronics-section.hbs';
import recreationAndSportTpl from '../templates/recreationAndSport-section.hbs';
import freeTpl from '../templates/sales-section.hbs';
import businessAndServicesTpl from '../templates/businessAndServices-section.hbs';
import tradeTpl from '../templates/trade-section.hbs';

const refs = {
  logoEL: document.querySelector('.js-logo-open'),
  mainContainerEL: document.querySelector('.js-render-main-page'),
};
console.log(refs.logoEL);
console.log(refs.mainContainerEL);

refs.logoEL.addEventListener('click', getCard);

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

  postData(API + page).then(data => {
    console.log(data);
    const sales = data.sales || [];
    createCategoryMarkup(sales, selesTpl);
    const property = data.property || [];
    createCategoryMarkup(property, propertyTpl);
    const transport = data.transport || [];
    createCategoryMarkup(transport, transportTpl);
    const work = data.work || [];
    createCategoryMarkup(work, workTpl);
    const electronics = data.electronics || [];
    createCategoryMarkup(electronics, electronicsTpl);
    const recreationAndSport = data.recreationAndSport || [];
    createCategoryMarkup(recreationAndSport, recreationAndSportTpl);
    const businessAndServices = data.businessAndServices || [];
    createCategoryMarkup(businessAndServices, businessAndServicesTpl);
    const free = data.free || [];
    createCategoryMarkup(free, freeTpl);
    const trade = data.trade || [];
    createCategoryMarkup(trade, tradeTpl);
  });
}

function createCategoryMarkup(arg, tpl) {
  if (arg.length === 0) {
    return;
  }
  refs.mainContainerEL.insertAdjacentHTML('beforeend', tpl(arg));
}

// function clearArticlesContainer() {
//   refs.articlesContainer.innerHTML = '';
// }
