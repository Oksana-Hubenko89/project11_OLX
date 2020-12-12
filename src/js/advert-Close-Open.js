const refsAdvert={
    // cardAdvert: document.querySelector('.js-advert'),
    openModal: document.querySelector('.js-advert-open'),
    advertCloseModal: document.querySelector('.js-advert-close'),
  
  }
console.log(refsAdvert.cardAdvert);
// console.log(refsAdvert.openModal);
// console.log(refsAdvert.advertCloseModal);

// refsAdvert.cardAdvert.addEventListener('click', addModalAdvert);
document.addEventListener('click', addModalAdvert)

// // закрытие модалки через кнопку
refsAdvert.advertCloseModal.addEventListener('click', modalClose);
 
// закрытие модалки по Esc
document.addEventListener('keydown', modalEscClose);

// зактрытие по оверлэю
refsAdvert.openModal.addEventListener('click', onModalBackdropClick);

// Функция открытия модалки
function addModalAdvert(event) {
  let target = event.target;
  // console.log(target.parentNode.classList[0]);
    if (target.parentNode.classList[0] ==='card-item') {

      refsAdvert.openModal.classList.remove('is-hidden');
    }
}
  
  // Функции закрытия модалки
  function modalClose() {
    refsAdvert.openModal.classList.add('is-hidden');
  }
  function modalEscClose(evt) {
    if (evt.key === "Escape") {
      modalClose();
    }
  }
  function onModalBackdropClick(evt) {
    console.dir(evt.target.attributes.class.value);
    // console.log(evt.target.dataset.action);
    if (evt.target.attributes.class.value.includes("add-backdrop")){
      modalClose();
    }
  } 