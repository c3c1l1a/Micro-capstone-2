export default class {
  constructor() {
    this.baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
  }

  // #updateLocalStorage() {
  //   if (localStorage.getItem('involvement').comments) {

  //   }
  // }

  async createComment(itemId, appId, username, comment) {
    try {
      const res = await fetch(`${this.baseUrl}apps/${appId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          item_id: itemId,
          username,
          comment,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      // return res.json();
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
      const contentType = res.headers.get("content-type");
      console.log(contentType);
      return res.json();
    } catch (error) {
      return error;
    }
  }
}