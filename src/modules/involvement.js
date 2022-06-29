export default class {
  constructor() {
    this.clientId = '';
    this.appId = '';
    this.baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
  }

  static async createAppID() {
    try {
      const res = await fetch(`${this.baseUrl}apps/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      this.appID = res.json();
      return this.appID;
    } catch (error) {
      return error;
    }
  }

  async createComment(itemId, username, comment) {
    try {
      const res = await fetch(`${this.baseUrl}apps/${this.appID}/comment`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
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

  static async getComments(itemId) {
    try {
      const res = await fetch(`${this.baseUrl}apps/${this.appID}/comment?item_id=${itemId}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return res.json();
    } catch (error) {
      return error;
    }
  }
}