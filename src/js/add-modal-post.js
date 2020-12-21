// import talkToApiServer from './talk-to-api-finction';
import uploadFile from './add-modal-preview';
import addFormValidate from './add-modal-valid';
// const axios = require('axios').default;
import axios from "axios";
const BASE_URL = `https://callboard-backend.herokuapp.com`; 
const addForm = document.querySelector('.add-modal-form');
const formImage = document.querySelector('.js-add-photo');
const previewList = document.querySelector('.preview-list');
const labelImage = document.querySelector('.label-photo-btn');
const addButton = document.querySelector('.add-modal-btn');
const addModal = document.querySelector('.js-add-modal');

addButton.addEventListener('click', addFormSend);
formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
})

function addFormSend(evt) {
    evt.preventDefault();
    removeValidation();
    let addModalError = addFormValidate(addForm);
    // const accessToken = localStorage.getItem('accessToken');

    if (addModalError === 0) {
      let formData = new FormData(addForm);
      let config = {
      method: 'POST',
      url: `${BASE_URL}/call`,
      headers: {
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorizatioin': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXA'

      },
      data: formData,
    };
        axios(config)
        .then(function (response) {
          console.log(response.data);
          
      })
      .catch(function (error) {
        console.log(error);
      });
      Close();
    } 
}
function Close() {
  addModal.classList.add('visually-hidden');
};
// Функция удаления фото из списка по щелчку
previewList.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        const remove = confirm('Видалити фото?');
        if (remove) {
          e.target.parentNode.remove();
        }
        if (previewList.children.length <= 5) {
        labelImage.classList.remove('show-photo');
    }
    }
    console.log(e.target);
});
// Функция очистки формы от сообщений валидации
function removeValidation() {
    let errorsValid = addForm.querySelectorAll('.add-valid-error');
   // console.log(errorsValid);
    for (let i = 0; i < errorsValid.length; i++) {
        errorsValid[i].remove();
    } 
}

/*add.addEventListener('click', ()=>{
    let data = new FormData(form);
    let config = {
        method: 'post',
        url: 'https://callboard-backend.herokuapp.com/call',
        headers: { 
          'accept': 'application/json', 
          'Content-Type': 'multipart/form-data', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ3Y2VhZWMyOThhMjAwMTc5YzhjYzAiLCJzaWQiOiI1ZmQ5MmMyMmNjZWZlZTAwMTc1M2ZiNzIiLCJpYXQiOjE2MDgwNjgxMzAsImV4cCI6MTYwODA3MTczMH0.I20tV29tq6tHg_XIPcDt1JW21Xmy3Un_kn64p6rMk_w'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
})*/

/*<form id="form">
        <input type="text" value="title" name="title">
        <input type="text" value="description" name="description">
        <input type="text" value="work" name="category">
        <input type="text" value="+380501110022" name="phone">
        <input type="text" value="0" name="price">
        <input type="file" name="file">
        <button class="add" type="button">add</button>
    </form>*/

    /*let add = document.querySelector('.add');
let form = document.querySelector('#form');

 */

/*let newItem = {
    "title": addName.value,
    "description": addDescr.value,
    "category": addCategory.value,
    "price": Number(addPrice.value),
    "phone": addPhone.value,
    // "imageUrls": [
    //     "string"
    // ],
};*/
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

