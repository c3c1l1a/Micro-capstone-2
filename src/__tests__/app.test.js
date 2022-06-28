/**
 * @jest-environment jsdom
 */

import fetchMock from 'jest-fetch-mock';
import Card from '../modules/Card.js';

const card = new Card();

fetchMock.enableMocks(); 

describe('Load images from External API', () => {
  it('Images are loaded from API', async () => {
    fetch.mockResponseOnce(JSON.stringify({"image":"https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg"})); /* Important bits */
    await card.getImage();

    expect(card.data.image).toEqual(JSON.parse(localStorage.getItem('data')).image);
  });
});