export default class {
	constructor(){
		this.imageUrl = '';
		this.stars = 0;
	}

	async fetchImage(){
		const response = await fetch('https://foodish-api.herokuapp.com/api/');
		const data = await response.json();
		this.imageUrl = data.image;
	}

	displayImage(appId, cardId){
		const mainTag = document.querySelector('main');
		const cardTemplate = document.querySelector('.card-template');
		
		const card = cardTemplate.content.firstElementChild.cloneNode(true);
		const cardImg = card.querySelector('.card-img');
		cardImg.setAttribute('src', this.imageUrl);

		//const stars = card.querySelectorAll('.fa-star');
		/*stars.forEach((node, index) => {
			node.addEventListener('click', async ()=>{
				let endpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'+ appId +'/likes/';
				const response = await fetch(endpoint, {
					method: 'POST',
					body: JSON.stringify({ 
						item_id: cardId,
						likes:  index+1,
					}),
					headers: {
					   'Content-type': 'application/json; charset=UTF-8',
					 }
				});
				this.stars = index+1;
			});
		});*/
		console.log('\n');

		mainTag.appendChild(card);
	}
}