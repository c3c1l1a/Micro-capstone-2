/* eslint-disable no-unused-vars */
export default class {
  constructor() {
    this.imageUrl = '';
  }

  async fetchImage() {
    const response = await fetch('https://foodish-api.herokuapp.com/api/');
    const data = await response.json();
    this.imageUrl = data.image;
  }

  displayImage(appId, cardId) {
    const mainTag = document.querySelector('main');
    const cardTemplate = document.querySelector('.card-template');

    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const cardImg = card.querySelector('.card-img');
    cardImg.setAttribute('src', this.imageUrl);
    mainTag.appendChild(card);
  }
}