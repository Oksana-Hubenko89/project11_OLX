// import talkToApiServer from './talk-to-api-finction';

const BASE_URL = `https://callboard-backend.herokuapp.com`; 
const addForm = document.querySelector('.add-modal-form');
const validateBtn = addForm.querySelector('.add-modal-btn');
const addName = addForm.querySelector('.js-add-name');
const addDescr = addForm.querySelector('.js-add-description');
const addCategory = document.querySelector('.js-category-input');
const addPrice = addForm.querySelector('.js-add-price');
const addPhone = addForm.querySelector('.js-add-phone');
// const addPhoto = addForm.querySelectorAll('.add-photo-btn')

let newItem = {
    "title": addName.value,
    "description": addDescr.value,
    "category": addCategory.value,
    "price": Number(addPrice.value),
    "phone": addPhone.value,
    // "imageUrls": [
    //     "string"
    // ],
};
validateBtn.addEventListener('click', qwerty);

function qwerty(newItem) {
    console.log(newItem);
}
// function addModalPost(item) {
//     const options = {
//     method: 'POST',
//     headers: {
//         "Content-Type": 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify(item),
//     };
//     fetch(`${BASE_URL}/call`, options)
//     .then(res => res.json())
//     .then(console.log);
// }






