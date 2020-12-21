// const axios = require('axios').default;
import axios from "axios";
const addForm = document.querySelector('#add-form');
const addButton = document.querySelector('.add-modal-btn');
// const addModal = document.querySelector('.js-add-modal');

  addButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    // const accessToken = localStorage.getItem('accessToken');
    let formData = new FormData(addForm);
    let config = {
      method: 'POST',
      url: 'https://callboard-backend.herokuapp.com/call',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorizatioin': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXA'
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmRlNTllMjY0NTAxYjAwMTczMDhmMmIiLCJpYXQiOjE2MDg0MDc1MjIsImV4cCI6MTYwODQxMTEyMn0.3byp5ioPGXyUIjbv867SFgWSoQoevmOeshTuJzZ6JLg'
      },
      data: formData,
    };
      
    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    // Close();
  })

// function Close() {
//   addModal.classList.add('visually-hidden');
// };


