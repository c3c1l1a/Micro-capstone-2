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

	#updateLocalStorage(){
		if (JSON.parse(localStorage.getItem('app')) === null){
			const data = {
				id: this.id,
				cards: this.cards 
			}
			console.log(data);
			localStorage.setItem('app', JSON.stringify(data));
		}
	}
}