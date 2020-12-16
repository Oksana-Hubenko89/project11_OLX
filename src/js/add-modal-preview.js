const formImage = document.querySelector('.js-photo');
const formPreview = document.querySelector('.add-preview');
const labelImage = document.querySelector('.label-photo-btn')

formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
})

function uploadFile(file) {

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only images!');
        formImage.value = '';
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('The file is to big! Should be less then 2 MB');
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}" alt="Photo">`;
        formPreview.classList.remove('show-photo');
        labelImage.classList.add('show-photo');
    };
    reader.onerror = function (e) {
        alert('Error!');
    };
    reader.readAsDataURL(file);
}
formPreview.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        const remove = confirm('Ви впевнені що хочете видалити фото зі списку?');
        if (remove) {
            e.target.remove();
            labelImage.classList.remove('show-photo');
            formPreview.classList.add('show-photo');
        }
    }
});
    
