/* eslint-disable no-unused-vars */

import Involvement from "./Involvement.js";

export default class {
  constructor() {
    this.imageUrl = '';
    this.likes = 0;
    this.card = this.#createCardTemplate();
  }

  async fetchImage() {
    const response = await fetch('https://foodish-api.herokuapp.com/api/');
    const data = await response.json();
    this.imageUrl = data.image;
  }

  displayImage(appId, cardId) {
    const mainTag = document.querySelector('main');
    const cardImg = this.card.querySelector('.card-img');
    cardImg.setAttribute('src', this.imageUrl);

    mainTag.appendChild(this.card);
  }

  #createCardTemplate(){
    const cardTemplate = document.querySelector('.card-template');
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    return card;
  }

  postLikesToAPI(appId, cardId){
    const mainTag = document.querySelector('main');
    const likesButton = this.card.querySelector('.likes-button');
    likesButton.addEventListener('click', async (e)=>{
      e.preventDefault();
      let endpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'+ appId +'/likes/';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          item_id: cardId,
        }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
         }
      });

      this.displayLikes(appId, cardId);
    });
  }

  async displayLikes(appId, cardId) {
    let endpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'+ appId +'/likes/';
    const response = await fetch(endpoint);

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      data.forEach((item)=>{
        if (item.item_id === cardId){
          this.likes = item.likes;
        }
      });
    }
    
    const likesButton = this.card.querySelector('.likes-count');
    likesButton.textContent = this.likes;
  }

  async displayComment(commentModal, index, appId) {
    const commentBtn = this.card.querySelector('.btn-comment');
    const closeComment = document.querySelector('.close-modal');
    const involvement = new Involvement();

    commentBtn.addEventListener('click', async () => {
      let comments = await involvement.getComments(index, appId);
      commentModal.children[1].innerHTML =`
          <div class="comment-container card-img-container">
            <img class="card-img" src="${this.imageUrl}" alt="">
          </div>
          <h2 class="card-details-header">Avocado Salad</h2>
           <h3 class="card-details-header clr-primary">Comments</h3>
      `;
      if (!comments.error){
        [...comments].forEach((comment)=>{
          ul.innerHTML +=   `<li> ${comment.creation_date}: ${comment.username} - ${comment.comment} </li>`
        })
        commentModal.children[1].appendChild(ul);
      }
      commentModal.show();
    });

    closeComment.addEventListener('click', () => {
      commentModal.close();
    });
  }
}