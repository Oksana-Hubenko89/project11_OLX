
const refs ={
    btnInfoSeller: document.querySelector('.js-info-seller'),
    info: document.querySelector('.js-info'),
    infoSeller: document.querySelector('.js-seller-on'),
  
}
// console.dir(refs.favorBtn);

refs.btnInfoSeller.addEventListener('click', showSellerInfo);


function showSellerInfo(params) {
    refs.info.classList.toggle('visually-hidden');
    refs.btnInfoSeller.classList.toggle('seller');
    refs.infoSeller.classList.toggle('visually-hidden');

}

// const BASE_URL = `https://callboard-backend.herokuapp.com`;


// export default function PostInFavorit(id) {
       
// 	axios.post(`${BASE_URL}/call/favourite/`, {
// 		"id": `${id}`,
// 	})
// 		.then(({ data }) => {
// 			console.log(data);
			
// 		})
// 		.catch(error => {
// 			console.log(error);
// 		})	
// }