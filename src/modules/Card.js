/* eslint-disable no-unused-vars */
import Involvement from "./Involvement.js";
const involvement = new Involvement;

export default class {
  constructor() {
    this.imageUrl = '';
    this.stars = 0;
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

    const commentBtn = card.querySelector('.comments');
    const commentModal = document.querySelector('.comment-modal');
    commentBtn.addEventListener('click', async () => {
      involvement.createComment(cardId, appId,'tomi-test','Good food')
      let comments = await involvement.getComments('item1', 'UJJc2JkxSYRZShjFhmpd');
      console.log(comments)
      commentModal.children[1].innerHTML = `
      <img src="${this.imageUrl}" alt="">
        <h2>Avocado Salad</h2>
        <h3>Comments</h3>
        <ul>
          <li> 03/11/2021 Cecelia: I love  it</li>
        </ul>
      `;
      commentModal.show();
    });
    
    commentModal.addEventListener('close', (e)=> {
      // console.log(cardId);
      console.log(commentModal.returnValue)
      // post comments
    })
    // const stars = card.querySelectorAll('.fa-star');
    /* stars.forEach((node, index) => {
      node.addEventListener('click', async ()=>{
        let endpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'+ appId +'/likes/';
        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({
            item_id: cardId,
            likes:  index+1,
          }),
          headers: {
             'Content-type': 'application/json; charset=UTF-8',
           }
        });
        this.stars = index+1;
      });
    }); */

    mainTag.appendChild(card);
  }
}