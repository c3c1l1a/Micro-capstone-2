export default class {
	constructor(){
		this.imageUrl = '';
	}

	async fetchImage(){
		const response = await fetch('https://foodish-api.herokuapp.com/api/');
		const data = await response.json();
		this.imageUrl = data.image;
	}
}