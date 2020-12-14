const refs ={
    btnInfoSeller: document.querySelector('.js-info-seller'),
    info: document.querySelector('.js-info'),
    infoSeller: document.querySelector('.js-seller-on'),
    
}
// console.dir(refs.btnInfoSeller);

refs.btnInfoSeller.addEventListener('click', showSellerInfo);

function showSellerInfo(params) {
    refs.info.classList.toggle('visually-hidden');
    refs.btnInfoSeller.classList.toggle('seller');
    refs.infoSeller.classList.toggle('visually-hidden');

}