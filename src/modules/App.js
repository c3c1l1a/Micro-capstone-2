export default class {
	constructor(){
		this.id = '';
		this.cards = [];
	}

	async createNew(){
		if (this.id.length <= 0){
			const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps', {
				method: 'POST',
				headers: {
				   'Content-type': 'application/json; charset=UTF-8',
				 },
			});
			this.id = await response.text();
		}
		this.#updateLocalStorage();
	}

	async populate(Card, num){
		if (this.cards.length <= 0){
			for (let i = 0; i < num; i++){
				const card = new Card();
				await card.fetchImage();
				card.displayImage(this.id, i);
				this.cards.push(card);
			}
			this.#updateLocalStorage();
		} else {
			for (let i = 0; i < num; i++){
				const card = new Card();
				card.imageUrl = this.cards[i].imageUrl;
				card.displayImage(this.id, i);
			}
		}	
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
			this.id = data.id
			if (data.cards.length > 0){
				this.cards = data.cards;
				return;
			}

			data.cards = this.cards;
			localStorage.setItem('app', JSON.stringify(data));
		}
	}
}