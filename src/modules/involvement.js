export default class {
  constructor() {
    this.baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
  }

  // #updateLocalStorage() {
  //   if (localStorage.getItem('involvement')) {
  //     const data = {
  //       id: this.id,
  //       cards: this.cards,
  //     };
  //     localStorage.setItem('involvement', JSON.stringify(data));
  //   } else {
  //     const data = JSON.parse(localStorage.getItem('app'));
  //     this.id = data.id;
  //     if (data.cards.length > 0) {
  //       this.cards = data.cards;
  //       return;
  //     }

  //     data.cards = this.cards;
  //     localStorage.setItem('app', JSON.stringify(data));
  //   }
  // }
  async createComment(itemId, appId, username, comment) {
    try {
      const res = await fetch(`${this.baseUrl}apps/${appId}/comments`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'origin': '*'
        },
        body: {
          itemId,
          username,
          comment,
        },

      });
      return res.json();
    } catch (error) {
      return error;
    }
  }

  async getComments(itemId,appId) {
    try {
      const res = await fetch(`${this.baseUrl}apps/${appId}/comments?item_id=${itemId}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return res.json();
    } catch (error) {
      return error.text();
    }
  }
}