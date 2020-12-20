const axios = require('axios').default;
const Handlebars = require('handlebars');

import markup from '../templates/section.hbs';

const refs ={
    btnInfoSeller: document.querySelector('.js-info-seller'),
    info: document.querySelector('.js-info'),
    infoSeller: document.querySelector('.js-seller-on'),
    sellerName: document.querySelector('.js-seller-name'),
    infoSellerTime: document.querySelector('.js-seller-time'),
    infoSellerTel: document.querySelector('.js-seller-tel'),
    advertTitle: document.querySelector('.js-advert-title'),
    advertPrice: document.querySelector('.js-advert-price'),
    advertIMG: document.querySelector('.js-advert-img'),
    advertDescript:document.querySelector('.js-advert-description'),
    containerForImgMarkup:document.querySelector('.js-img-markup'),
    codeAdvert:document.querySelector('.js-code-advert'),
    
}
// console.dir(refs.advertIMG);
let imgNumber = 1;
refs.btnInfoSeller.addEventListener('click', showSellerInfo);


function showSellerInfo(evt) {
    refs.info.classList.toggle('visually-hidden');
    refs.btnInfoSeller.classList.toggle('seller');
    refs.infoSeller.classList.toggle('visually-hidden');
    // sellerInfoRender(evt);
}

const BASE_URL = `https://callboard-backend.herokuapp.com/`;

const key = localStorage.getItem('accessToken');

async function getUserInform (userId) {	
	return await axios.get(`${BASE_URL}user/${userId}`,{
        headers: {
          'Content-Type': 'application/json',
        
          Authorization: `${key}`,
        },
          
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
      })
		.then(({ data }) => sellerInfoRender(data))
}

function sellerInfoRender (data) {
    refs.infoSellerTime.textContent =`На OLX с ${data.registrationDate}`;
    refs.sellerName.textContent = `email: ${data.email}`;
    // console.log(data.email);
    // console.log(data.registrationDate);
}

async function getCardInfoFromServer(category,cardId) {
    return await axios.get(`${BASE_URL}call/specific/${category}`,{
        headers: {
          'Content-Type': 'application/json',
        
          Authorization: `${key}`,
        },
          
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
      })
		.then(({ data }) =>getOneCardFromCategory (data, cardId))
}
export { getCardInfoFromServer, clearAdvertInfo };

function getOneCardFromCategory (data, cardId) {
//   console.log(data);
//   console.log(cardId);
  data.forEach(({_id, description, imageUrls, phone, price, title, userId}) => {
    if(_id === cardId){
        
        refs.advertTitle.textContent = title;
        refs.advertDescript.textContent = description;
        refs.infoSellerTel.textContent = phone;
        refs.advertPrice.textContent = price;
        refs.info.id = userId;
        getUserInform(userId);
        refs.codeAdvert.textContent = cardId.slice(-4);
        if (imageUrls.length === 1) {
            // console.log('vjndflvbldhfbv');
            refs.advertIMG.src = (imageUrls[0]);
        } else {
            createImgMarkup(userId);
            const slide = imgSlide.document.querySelector('.js-img-slide');
            slide.document.addEventListener('click', sliderImg(userId))
        }
    }
            
});
}  
function createImgMarkup (userId) {
    refs.containerForImgMarkup.insertAdjacentHTML(
      'beforeend',
      markup(userId),
    );
}
    
function clearAdvertInfo() {
    refs.containerForImgMarkup.innerHTML = '';
    refs.advertTitle.textContent='';
    refs.advertIMG.src = '/';
    imgNumber =1;
}
function sliderImg(userId) {
    if(userId.length-1 >=imgNumber ){
        refs.advertIMG.src = userId[imgNumber];
        imgNumber+=1;
    } else {
        refs.advertIMG.src = (imageUrls[0]);
    }
   
}