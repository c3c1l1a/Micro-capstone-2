/* eslint-disable no-await-in-loop */
export default class {
  constructor() {
    this.id = '';
    this.cards = [];
  }

  async createNew() {
    if (this.id.length <= 0) {
      const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      this.id = await response.text();
      this.id = 'ww6n6aXvcSq4LrvQeaoj';
    }
    this.#updateLocalStorage();
  }

  async populate(Card, num) {
    for (let i = 0; i < num; i += 1) {
      const card = new Card();
      if (this.cards.length <= i) {
        await card.fetchImage();
        this.cards.push(card);
      }
      card.imageUrl = this.cards[i].imageUrl;
      card.displayImage(this.id, i);
      card.postLikesToAPI(this.id, i);
      card.displayLikes(this.id, i);
      card.displayComment(i, this.id);
      card.postComment(this.id, i, this.#updateLocalStorage.bind(this));
    }
    this.#updateLocalStorage();
  }

  #updateLocalStorage() {
    if (JSON.parse(localStorage.getItem('app')) === null) {
      const data = {
        id: this.id,
        cards: this.cards,
      };
      localStorage.setItem('app', JSON.stringify(data));
    } else {
      const data = JSON.parse(localStorage.getItem('app'));
      this.id = data.id;
      if (data.cards.length > 0) {
        this.cards = data.cards;
        return;
      }

      data.cards = this.cards;
      localStorage.setItem('app', JSON.stringify(data));
    }
  }
}