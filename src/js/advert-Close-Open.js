// const axios = require('axios').default;
import { getCardInfoFromServer,clearAdvertInfo } from './advert-logic';


const refsAdvert={
  openModal: document.querySelector('.js-advert-open'),
  advertCloseModal: document.querySelector('.js-advert-close'),
  // advertIMG: document.querySelector('.js-advert-img'),
  // sellerName: document.querySelector('.js-seller-name'),
  // sellerTime: document.querySelector('.js-seller-time'),
  // sellerTel: document.querySelector('.js-seller-tel'),
  favorBtn: document.querySelector('.js-advert-favorites'),
  modal: document.querySelector('.advert-modal'),
  addShare:document.querySelector('.add-share'),
  iconHeartContured: document.querySelector('[data-heartIconContured]'),
  iconHeartFull:document.querySelector('[data-heartIconFull]'),
  
}


document.addEventListener('click', openModalAdvert)

// refsAdvert.favorBtn.addEventListener('click', PostInFavorit);

// // закрытие модалки через кнопку
refsAdvert.advertCloseModal.addEventListener('click', modalClose);

// закрытие модалки по Esc
document.addEventListener('keydown', modalEscClose);

// зактрытие по оверлэю
refsAdvert.openModal.addEventListener('click', onModalBackdropClick);

// console.log(localStorage.getItem('accessToken'));

// function PostInFavorit() {
//   refsAdvert.favorBtn.dataset.favoriteBbuttonMarked='data-favorite-button-marked';
//   // data-favorite-item='data-favorite-item'
//   console.dir(refsAdvert.favorBtn.dataset);
//   refsAdvert.addShare.dataset.favoriteItem = 'data-favorite-item';
//   refsAdvert.addShare.dataset.item='';
// }



// Функция открытия модалки
function openModalAdvert(event) {
  let target = event.target;
  if (target.parentElement.classList[0] ==='card-item') {
    if (target.parentElement.dataset.marked === 'true'){
      refsAdvert.iconHeartFull.classList.remove('visually-hidden');
      refsAdvert.iconHeartContured.classList.add('visually-hidden');
    }
   
    if(target.parentElement.closest.classList='section'){
      const IdCategory = target.closest('section').getAttribute('id');
      getCardInfoFromServer(IdCategory, getcardId(event));
    }
      
    // открыть модалку
    refsAdvert.openModal.classList.remove('is-hidden');
    
  }

}

// Функции закрытия модалки
function modalClose() {
  clearAdvertInfo()
  refsAdvert.openModal.classList.add('is-hidden');
  refsAdvert.addShare.id = '';
}
function modalEscClose(evt) {
  if (evt.key === "Escape") {
    modalClose();
  }
}
function onModalBackdropClick(evt) {
   if (evt.target.attributes.class.value.includes("add-backdrop")) {
    modalClose();
  }
} 

function getcardId (evt) {
  return evt.target.parentElement.id
   
}

// функция получения и подставления адруса картинки 
// function changeImgOnAdvert(target) {
//   // Брать значение картинки и переподставлять в свою в модалке
//   // refsAdvert.advertIMG.src = target.parentElement.firstElementChild.firstElementChild.currentSrc;
// }

// function changeAdvertTitle(target) {
//   let item = target.parentElement.children;
//   const userid = target.parentElement.dataset.userid;
//   getUserInform(userid);

  
//   refsAdvert.addShare.id = target.parentElement.id;
 
//   // refsAdvert.advertTitle.textContent='';


//   refsAdvert.advertPrice.textContent='';
  
//   // refsAdvert.advertTitle.textContent = item[1].textContent;

//   if(item[2].children.length === 2 &&
//      item[2].children[1].textContent !=="" ){
//       //  console.log(item[2].children[1].textContent);
//     refsAdvert.advertPrice.textContent = item[2].children[1].textContent;
//   } else {
//     refsAdvert.advertPrice.textContent= item[2].children[0].textContent;
//   }
    
// }