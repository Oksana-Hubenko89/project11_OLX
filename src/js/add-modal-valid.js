const addForm = document.querySelector('.add-modal-form');
const validateBtn = addForm.querySelector('.add-modal-btn');
// const addName = addForm.querySelector('.js-add-name');
// const addDescr = addForm.querySelector('.js-add-description');
// const addCategory = document.querySelector('.js-category-input');
// const addPrice = addForm.querySelector('.js-add-price');
// const addPhone = addForm.querySelector('.js-add-phone');
const addInputs = addForm.querySelectorAll('.js-add-input');

const clearB = addForm.querySelector('.clear-btn'); 

addForm.addEventListener('submit', addFormValidate)
let addModalError = 0;
function addFormValidate(evt) {
    evt.preventDefault();
    removeValidation();
    for (let i = 0; i < addInputs.length; i++) {
        let errorMarkup = `<p class="add-valid-error">* поле має бути заповнено</p>`;
        if (!addInputs[i].value) {
            // console.log('input is blank', addInputs[i]);
            addInputs[i].parentElement
                .insertAdjacentHTML('afterend', errorMarkup);
            addModalError++;
        }
        // return addModalError;
    }
    return addModalError;
    // console.log(addModalError);
}

function removeValidation() {
    let errorsValid = addForm.querySelectorAll('.add-valid-error');
   // console.log(errorsValid);
    for (let i = 0; i < errorsValid.length; i++) {
        errorsValid[i].remove();
    } 
}

// clearB.addEventListener('click', clearAdd);
// function clearAdd(e) {
//     e.preventDefault();
//     addForm.reset();
// }

