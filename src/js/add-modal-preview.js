const formImage = document.querySelector('.js-photo');
const labelImage = document.querySelector('.label-photo-btn');
const previewList = document.querySelector('.preview-list');

formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
})

function uploadFile(file) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Тільки фото у форматі jpeg, png');
        formImage.value = '';
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        alert('Розмір фото має бути менше 2 MB');
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        previewList.insertAdjacentHTML('afterbegin', `<li class="add-preview"><img src="${e.target.result}" alt="Photo" /></li>`);
    }
        // formPreview.classList.toggle('show-photo');
        // labelImage.classList.toggle('show-photo');
    reader.onerror = function (e) {
        alert('Error!');
    };
    
    reader.readAsDataURL(file);
}
// if (formPreview.length > 3) {
//         labelImage.classList.add('show-photo');
//         console.log('+++');
//     }
// Функция удаления фото из списка по щелчку
previewList.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        const remove = confirm('Видалити фото?');
        if (remove) {
            e.target.parentNode.remove();
            // labelImage.classList.remove('show-photo');
            // formPreview.classList.add('show-photo');
        }
    }
    console.log(e.target);
});
    
