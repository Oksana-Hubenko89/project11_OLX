
const BtnMyoffice = document.querySelector('.js-btn-my-off');
const ConteinerMyoffice = document.querySelector('.my-office');
const BtnLogandReg = document.querySelector('.js-btn-log-and-reg');

/**
 * Функция обновляет состояние моего кабинета в зависимости от присутствия токена в locallstorage
 * функция должна вызываться при кажном обновленном состояния токена
 */

 function UpdateOfficeBtnByToken () {
    if(localStorage.getItem('accessToken') === null){
        BtnLogandReg.classList.remove('itsAuth');
        ConteinerMyoffice.classList.add('itsAuth');
    } else {
        BtnLogandReg.classList.add('itsAuth');
        ConteinerMyoffice.classList.remove('itsAuth');
    }
}
UpdateOfficeBtnByToken();
export default  UpdateOfficeBtnByToken;
    