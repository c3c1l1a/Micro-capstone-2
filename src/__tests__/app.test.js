/**
 * @jest-environment jsdom
 */

import fetchMock from 'jest-fetch-mock';
import App from '../modules/App.js';
import Card from '../modules/Card.js';

const card = new Card();
const app = new App();

fetchMock.enableMocks(); 

describe('Create new app and return unique Identifier', ()=> {
  it('Tests if a new app has been created in Involvement API and a unique stored in localStorage', async ()=> {
    fetch.mockResponseOnce("ZyBiPoL5iOvL5CYLtNcq");
    await app.createNew();
    
    expect(app.id).toEqual(JSON.parse(localStorage.getItem('app')).id);
  });
});


/*describe('Load card image from External API', () => {
  it('Images are loaded from API', async () => {
    fetch.mockResponseOnce(JSON.stringify({"image":"https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg"})); // Important bits 
    await card.getImage();

    expect(card.data.image).toEqual(JSON.parse(localStorage.getItem('data')).image);
  });
});*/