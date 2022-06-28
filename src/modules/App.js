export default class {
	constructor(){
		this.id = '';
		this.cards = [];
	}

	async createNew(){
		const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps', {
			method: 'POST',
			headers: {
			   'Content-type': 'application/json; charset=UTF-8',
			 },
		});
		this.id = await response.text();
		this.#updateLocalStorage();
	}

	async populate(Card, num){
		for (let i = 0; i < num; i++){
			const card = new Card();
			await card.fetchImage();
			this.cards.push(card);
		}
		this.#updateLocalStorage();
	}

	#updateLocalStorage(){
		if (JSON.parse(localStorage.getItem('app')) === null){
			const data = {
				id: this.id,
				cards: this.cards 
			}
			localStorage.setItem('app', JSON.stringify(data));
		} else {
			const data = JSON.parse(localStorage.getItem('app'));
			data.cards = this.cards;
			localStorage.setItem('app', JSON.stringify(data));
		}
	}
}